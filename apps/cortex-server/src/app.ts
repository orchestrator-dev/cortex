import Fastify from "fastify";
import { logger } from "./lib/logger.js";
import { registerPlugins } from "./plugins/index.js";
import { registerRoutes } from "./routes/index.js";
import { registry } from "./modules/content/registry.js";
import { cortexEvents } from "./lib/events.js";
import { pubsub } from "./graphql/context.js";
import { webhookService } from "./modules/webhooks/webhook.service.js";
import graphqlPlugin from "./graphql/index.js";

export async function buildApp() {
    const app = Fastify({ logger: logger as any });

    await registerPlugins(app);

    // Load content type registry before routes
    await registry.load();

    // Register GraphQL plugin (Yoga + schema)
    await app.register(graphqlPlugin);

    await registerRoutes(app);

    // ─── Bridge cortexEvents → GraphQL PubSub ──────────────────────────────
    cortexEvents.on("content.created", (entry) => {
        const ct = registry.getAll().find((t) => t.id === entry.contentTypeId);
        if (ct) pubsub.publish(`entry.created.${ct.name}`, entry);
    });
    cortexEvents.on("content.updated", (entry) => {
        const ct = registry.getAll().find((t) => t.id === entry.contentTypeId);
        if (ct) pubsub.publish(`entry.updated.${ct.name}`, entry);
    });
    cortexEvents.on("content.deleted", (id, contentType) => {
        pubsub.publish(`entry.deleted.${contentType}`, { id, contentType });
    });

    // ─── Bridge cortexEvents → Webhook delivery ────────────────────────────
    cortexEvents.on("content.created", (entry) => {
        const ct = registry.getAll().find((t) => t.id === entry.contentTypeId);
        if (ct) webhookService.trigger("entry.created", ct.name, entry).catch(console.error);
    });
    cortexEvents.on("content.updated", (entry) => {
        const ct = registry.getAll().find((t) => t.id === entry.contentTypeId);
        if (ct) webhookService.trigger("entry.updated", ct.name, entry).catch(console.error);
    });
    cortexEvents.on("content.deleted", (id, contentType) => {
        webhookService.trigger("entry.deleted", contentType, { id, contentType }).catch(console.error);
    });
    cortexEvents.on("content.published", (entry) => {
        const ct = registry.getAll().find((t) => t.id === entry.contentTypeId);
        if (ct) webhookService.trigger("entry.published", ct.name, entry).catch(console.error);
    });

    return app;
}
