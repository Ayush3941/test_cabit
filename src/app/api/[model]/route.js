import { drizzle } from "drizzle-orm/node-postgres";
import { eq, lt, gte, ne } from 'drizzle-orm';
import { Pool } from "pg";
import { UserTable, Drivers, SessionTable, Itinerary, Rides, Distress ,contactUsQueries} from "../../../drizzle/schema";
import { db } from "../../../lib/db";

const tables = {
    users: { table: UserTable, idField: "user_id" },
    drivers: { table: Drivers, idField: "driver_id" },
    sessions: { table: SessionTable, idField: "id" },
    itinerary: { table: Itinerary, idField: "session_id" },
    rides: { table: Rides, idField: "ride_id" },
    distress: { table: Distress, idField: "ride_id" },
    contactus: { table: contactUsQueries, idField: "query_id" },
};

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const model = searchParams.get("model");
        const id = searchParams.get("id");

        if (!tables[model]) return new Response(JSON.stringify({ error: "Invalid model" }), { status: 400 });
        const tableInfo = tables[model];

        if (id) {
            const [record] = await db.select().from(tableInfo.table).where(eq(tableInfo.table[tableInfo.idField], id));
            return record ? new Response(JSON.stringify({ record })) : new Response(JSON.stringify({ error: "Record not found" }), { status: 404 });
        } else {
            const records = await db.select().from(tableInfo.table);
            return new Response(JSON.stringify({ records }));
        }
    } catch (err) {
        console.error("API Error:", err);
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}

export async function POST(req) {
    try {
        const { searchParams } = new URL(req.url);
        const model = searchParams.get("model");

        if (!model || !tables[model]) {
            return new Response(JSON.stringify({ error: "Invalid model" }), { status: 400 });
        }
        const body = await req.json();
        const [createdRecord] = await db.insert(tables[model].table).values(body).returning();
        return new Response(JSON.stringify({ createdRecord }), { status: 201 });
    } catch (err) {
        console.error("API Error:", err);
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const { searchParams } = new URL(req.url);
        const model = searchParams.get("model");
        const id = searchParams.get("id");

        if (!model || !id || !tables[model]) {
            return new Response(JSON.stringify({ error: "Invalid model or id" }), { status: 400 });
        }

        const body = await req.json();
        const [updatedRecord] = await db.update(tables[model].table)
            .set(body)
            .where(eq(tables[model].table[tables[model].idField], id))
            .returning();

        return updatedRecord ? new Response(JSON.stringify({ updatedRecord })) : new Response(JSON.stringify({ error: "Record not found" }), { status: 404 });
    } catch (err) {
        console.error("API Error:", err);
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const model = searchParams.get("model");
        const id = searchParams.get("id");

        if (!model || !id || !tables[model]) {
            return new Response(JSON.stringify({ error: "Invalid model or id" }), { status: 400 });
        }
        const record = await db.delete(tables[model].table)
            .where(eq(tables[model].table[tables[model].idField], id))
            .returning();

        return record ? new Response(JSON.stringify({ record })) : new Response(JSON.stringify({ error: "Record not found" }), { status: 404 });
    } catch (err) {
        console.error("API Error:", err);
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}
