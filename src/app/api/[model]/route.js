import { drizzle } from "drizzle-orm/node-postgres";
import { eq, lt, gte, ne } from 'drizzle-orm';
import { Pool } from "pg";
import { UserTable, Drivers, SessionTable, Itinerary, Rides, Distress ,contactUsQueries} from "../../../drizzle/schema";

const dbConfig = { connectionString: "postgresql://postgres:maggiatta123@db.peykhrcroyixquwxmbhe.supabase.co:5432/postgres" };
const pool = new Pool(dbConfig);
const db = drizzle(pool);
 const tables = {
            users: { table: UserTable, idField: "user_id" },
            drivers: { table: Drivers, idField: "driver_id" },
            sessions: { table: SessionTable, idField: "id" },
            itinerary: { table: Itinerary, idField: "session_id" },
            rides: { table: Rides, idField: "ride_id" },
            distress: { table: Distress, idField: "ride_id" },
            contactus: { table: contactUsQueries, idField: "query_id"},
        };
export async function GET(req,res) {
    try {
        const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
        const model = searchParams.get("model");
        const id = searchParams.get("id");
        
        if (!tables[model]) return new Response(JSON.stringify({ error: "Invalid model" }), { status: 400 });

        const tableInfo = tables[model];

        if (id) {
                const [record] = await db.select().from(tableInfo.table).where(eq(tableInfo.table[tableInfo.idField],id));  
              
                return record ? new Response(JSON.stringify({ record })) : new Response(JSON.stringify({ error: "Record not found" }), { status: 404 });
            } else {
                const records = await db.select().from(tableInfo.table);
                return new Response(JSON.stringify({ records }));
            }
    } catch (err) {
        console.error("API Error:", err);
        return new Response(JSON.stringify({ error: err.message}), { status: 500 });
    }
}

export async function POST(req, res) {
    try {
        const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
        const model = searchParams.get("model");

        if (!model) {
            console.error("Model is missing from the request.");
            return new Response(JSON.stringify({ error: "Model parameter required" }), { status: 400 });
        }

        const tables = {
            users: UserTable,
            drivers: Drivers,
            sessions: SessionTable,
            itinerary: Itinerary,
            rides: Rides,
            distress: Distress,
            contactus:contactUsQueries
        };

        if (!tables[model]) {
            console.error(`Invalid model: ${model}`);
            return new Response(JSON.stringify({ error: "invalid model" }), { status: 400 });
        }

      
        let body;
        try {
            body = await req.json();
        } catch (err) {
            console.error("Error parsing JSON body:", err);
            return new Response(JSON.stringify({ error: "invalid json" }), { status: 400 });
        }

      
        try {
            const [createdRecord] = await db.insert(tables[model]).values(body).returning();
            console.log("Created Record:", createdRecord);
            return new Response(JSON.stringify({ createdRecord }), { status: 201 });
        } catch (err) {
            console.error("Error during database insert:", err);
            return new Response(JSON.stringify({ error: err.message  }), { status: 500 });
        }
    } catch (err) {
        console.error("Unexpected API error:", err);
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}

export async function PUT(req, res) {
    try {
        const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
        const model = searchParams.get("model");
        const id = searchParams.get("id");

        if (!model || !id) {
            console.error("Model or ID is missing from the request.");
            return new Response(JSON.stringify({ error: "Model and ID parameters are required" }), { status: 400 });
        }

        if (!tables[model]) {
            console.error(`Invalid model: ${model}`);
            return new Response(JSON.stringify({ error: "Invalid model" }), { status: 400 });
        }

        let body;
        try {
            body = await req.json();
        } catch (err) {
            console.error("Error parsing JSON body:", err);
            return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
        }
        const tableInfo = tables[model];
      
        const [updatedRecord] = await db.update(tableInfo.table).set(body).where(eq(tableInfo.table[tableInfo.idField],id)).returning();

        if (updatedRecord) {
            return new Response(JSON.stringify({ updatedRecord }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: "Record not found" }), { status: 404 });
        }
    } catch (err) {
        console.error("API Error:", err);
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}

export async function DELETE(req, res) {
    try {
        const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
        const model = searchParams.get("model");
        const id = searchParams.get("id");

        if (!model || !id) {
            console.error("Model or ID is missing from the request.");
            return new Response(JSON.stringify({ error: "Model and ID parameters are required" }), { status: 400 });
        }

        if (!tables[model]) {
            console.error(`Invalid model: ${model}`);
            return new Response(JSON.stringify({ error: "Invalid model" }), { status: 400 });
        }
        const tableInfo = tables[model];
     
        if (id) {
            const record = await db.delete(tableInfo.table).where(eq(tableInfo.table[tableInfo.idField],id)).returning();  
            console.log(id,tableInfo.table[tableInfo.idField])
            return record ? new Response(JSON.stringify({ record })) : new Response(JSON.stringify({ error: "Record not found" }), { status: 404 });
            } else {
                const records = await db.select().from(tableInfo.table);
                return new Response(JSON.stringify({ error: "Enter an Id to delete" }), { status: 404 });
            }
    } catch (err) {
        console.error("API Error:", err);
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}
