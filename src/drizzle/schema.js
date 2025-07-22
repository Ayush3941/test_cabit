import {
  pgTable, varchar, text, pgEnum, integer, bigserial,
  timestamp, decimal, jsonb, smallint, date, uuid,
  serial, bigint, boolean, primaryKey
} from "drizzle-orm/pg-core";
import { sql, relations } from "drizzle-orm";

export const genderEnum = pgEnum("user_gender", ["male", "female", "other"]);
export const roleEnum = pgEnum("role", ["user", "driver", "admin"]);
export const sessionStatusEnum = pgEnum("session_status", ["active", "expired"]);
export const tripStatusEnum = pgEnum("trip_status", ["completed", "ongoing", "cancelled"]);
export const paymentStatusEnum = pgEnum("payment_status", ["pending", "paid", "failed"]);
export const rideStatusEnum = pgEnum("ride_status", ["ongoing", "successful", "failed"]);
export const distressStatusEnum = pgEnum("distress_status", ["active", "inactive"]);
export const oAuthProviders = ["discord", "github", "google"];
export const oAuthProviderEnum = pgEnum("oauth_provides", oAuthProviders);
export const issueEnum = pgEnum('issue_type', ['Trip Issue','Cab Issue','Payment Issue','App Issue','Other']);

export const UserTable = pgTable("users", {
  user_id: uuid('user_id').defaultRandom().primaryKey(),
  user_name: varchar("user_name", { length: 100 }).notNull(),
  user_gender: genderEnum("user_gender"),
  user_password: text("user_password"),
  salt: text("salt"),
  email: text("email").notNull().unique(),
  user_phone: varchar("user_phone", { length: 15 }),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp({ withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
  role: roleEnum("role").notNull(),
  client_avg_rating: decimal("client_avg_rating", { precision: 3, scale: 2 }).default("0.0"),
  forget_pass_ans: varchar("forget_pass_ans", { length: 255 }).default(null),
  more_info: jsonb("more_info").default(sql`'{}'::jsonb`),
});

export const Drivers = pgTable("drivers", {
  driver_id: bigint("driver_id", { mode: "number" }).primaryKey(),
  user_id: uuid("user_id").notNull().references(() => UserTable.user_id, { onDelete: "cascade" }),
  license_number: varchar("license_number", { length: 50 }).notNull().unique(),
  vehicle_id: integer("vehicle_id").notNull(),
  driver_avg_rating: decimal("driver_avg_rating", { precision: 3, scale: 2 }).default("0.0"),
  driver_status: boolean("driver_status").default(false),
  efficiency_coefficient: integer("efficiency_coefficient"),
  languages: jsonb("languages"),
  current_work_loc: varchar("current_work_loc", { length: 255 }),
  driver_created_at: timestamp("driver_created_at").defaultNow(),
  adhar_info: varchar("adhar_info", { length: 20 }).unique(),
  more_info: jsonb("more_info").default(sql`'{}'::jsonb`),
});

export const SessionTable = pgTable("sessions", {
  id: varchar("id", { length: 512 }).primaryKey(),
  userId: uuid("user_id").notNull().references(() => UserTable.user_id, { onDelete: "cascade" }),
  role: roleEnum("role").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
});

export const Itinerary = pgTable("itinerary", {
  session_id: serial("session_id").primaryKey(),
  user_id: uuid("user_id").notNull().references(() => UserTable.user_id, { onDelete: "cascade" }),
  trip_status: tripStatusEnum("trip_status").notNull(),
  items: jsonb("items").default(sql`'{}'::jsonb`),
  start_date: date("start_date").notNull(),
  end_date: date("end_date").notNull(),
  time_created: timestamp("time_created").defaultNow(),
  payment_status: paymentStatusEnum("payment_status"),
  cookie: jsonb("cookie").default(null),
});

export const Rides = pgTable("rides", {
  ride_id: serial("ride_id").primaryKey(),
  user_id: uuid("user_id").notNull().references(() => UserTable.user_id, { onDelete: "cascade" }),
  driver_id: bigint("driver_id", { mode: "number" }).references(() => Drivers.driver_id),
  rating_given: jsonb("rating_given").default(sql`'[]'::jsonb`),
  pickup_location: jsonb("pickup_location").notNull(),
  drop_location: jsonb("drop_location").notNull(),
  distance_km: decimal("distance_km", { precision: 10, scale: 2 }),
  fare_amount: decimal("fare_amount", { precision: 8, scale: 2 }),
  payment_status: paymentStatusEnum("payment_status"),
  ride_status: rideStatusEnum("ride_status"),
  created_at: timestamp("created_at").defaultNow(),
  completed_at: timestamp("completed_at").default(null),
  path_taken: jsonb("path_taken").default(sql`'{}'::jsonb`),
  remark: jsonb("remark").default(sql`'{}'::jsonb`),
});

export const Distress = pgTable("distress", {
  ride_id: serial("ride_id").primaryKey().references(() => Rides.ride_id),
  user_id: uuid("user_id").notNull().references(() => UserTable.user_id, { onDelete: "cascade" }),
  driver_id: bigint("driver_id", { mode: "number" }).references(() => Drivers.driver_id),
  pickup_location: jsonb("pickup_location").notNull(),
  drop_location: jsonb("drop_location").notNull(),
  distance_km: decimal("distance_km", { precision: 10, scale: 2 }),
  created_at: timestamp("created_at").defaultNow(),
  distress_call_at: timestamp("distress_call_at").defaultNow(),
  call_location: jsonb("call_location").notNull(),
  path_taken: jsonb("path_taken").default(sql`'{}'::jsonb`),
  current_location: jsonb("current_location").notNull(),
  distress_status: boolean("distress_status").default(false),
  resolution_time: timestamp("resolution_time").default(null),
  resolved_by: integer("resolved_by").default(null),
  driver_response_at: timestamp("driver_response_at").default(null),
  emergency_contact_notified: boolean("emergency_contact_notified").default(false),
  emergency_services_contacted: boolean("emergency_services_contacted").default(false),
  notes: text("notes"),
});

export const UserOAuthAccountTable = pgTable(
  "user_oauth_accounts",
  {
    user_id: uuid('user_id').notNull().references(() => UserTable.user_id, { onDelete: "cascade" }),
    provider: oAuthProviderEnum("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull().unique(),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
  },
  (t) => [
    primaryKey({ columns: [t.providerAccountId, t.provider] })
  ]
);

export const userOauthAccountRelationships = relations(
  UserOAuthAccountTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [UserOAuthAccountTable.user_id],
      references: [UserTable.user_id],
    }),
  })
);

export const contactUsQueries = pgTable('contactus_queries', {
  query_id: uuid('query_id').defaultRandom().primaryKey(),
  user_name: varchar('user_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 150 }).notNull(),
  user_phone: varchar('user_phone', { length: 15 }),
  issue: issueEnum('issue').notNull(),
  query: text('query').notNull(),
});
