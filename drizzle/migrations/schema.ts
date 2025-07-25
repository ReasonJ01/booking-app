import { pgTable, foreignKey, unique, text, timestamp, integer, boolean } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"




export const session = pgTable("session", {
	id: text("id").primaryKey().notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	token: text("token").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id").notNull(),
	impersonatedBy: text("impersonated_by"),
},
(table) => {
	return {
		sessionUserIdUserIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "session_user_id_user_id_fk"
		}).onDelete("cascade"),
		sessionTokenUnique: unique("session_token_unique").on(table.token),
	}
});

export const verification = pgTable("verification", {
	id: text("id").primaryKey().notNull(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
});

export const account = pgTable("account", {
	id: text("id").primaryKey().notNull(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id").notNull(),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at", { mode: 'string' }),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { mode: 'string' }),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		accountUserIdUserIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "account_user_id_user_id_fk"
		}).onDelete("cascade"),
	}
});

export const faq = pgTable("faq", {
	id: text("id").primaryKey().notNull(),
	question: text("question").notNull(),
	answer: text("answer").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	order: integer("order").default(0).notNull(),
});

export const review = pgTable("review", {
	id: text("id").primaryKey().notNull(),
	comment: text("comment").notNull(),
	userId: text("user_id"),
	name: text("name"),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	isApproved: boolean("is_approved").default(false).notNull(),
	reviewDate: timestamp("review_date", { mode: 'string' }),
},
(table) => {
	return {
		reviewUserIdUserIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "review_user_id_user_id_fk"
		}).onDelete("set null"),
	}
});

export const user = pgTable("user", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	email: text("email").notNull(),
	emailVerified: boolean("email_verified").notNull(),
	image: text("image"),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
	role: text("role").default('user'),
	banned: boolean("banned"),
	banReason: text("ban_reason"),
	banExpires: timestamp("ban_expires", { mode: 'string' }),
},
(table) => {
	return {
		userEmailUnique: unique("user_email_unique").on(table.email),
	}
});

export const image = pgTable("image", {
	id: text("id").primaryKey().notNull(),
	url: text("url").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	carousel: boolean("carousel").default(false).notNull(),
});

export const service = pgTable("service", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	description: text("description").notNull(),
	price: integer("price").notNull(),
	duration: integer("duration").notNull(),
	hash: text("hash").notNull(),
	showOnWebsite: boolean("showOnWebsite").default(true).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	preBufferMinutes: integer("preBufferMinutes").notNull(),
	postBufferMinutes: integer("postBufferMinutes").notNull(),
	overridePreBuffer: boolean("overridePreBuffer").default(false).notNull(),
	overridePostBuffer: boolean("overridePostBuffer").default(false).notNull(),
});

export const bookingFlowOptionService = pgTable("booking_flow_option_service", {
	optionId: text("option_id").notNull(),
	serviceId: text("service_id").notNull(),
},
(table) => {
	return {
		bookingFlowOptionServiceOptionIdBookingFlowOptionIdFk: foreignKey({
			columns: [table.optionId],
			foreignColumns: [bookingFlowOption.id],
			name: "booking_flow_option_service_option_id_booking_flow_option_id_fk"
		}).onDelete("cascade"),
		bookingFlowOptionServiceServiceIdServiceIdFk: foreignKey({
			columns: [table.serviceId],
			foreignColumns: [service.id],
			name: "booking_flow_option_service_service_id_service_id_fk"
		}).onDelete("cascade"),
	}
});

export const bookingFlowQuestion = pgTable("booking_flow_question", {
	id: text("id").primaryKey().notNull(),
	text: text("text").notNull(),
	order: integer("order").default(0).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
});

export const bookingFlowOption = pgTable("booking_flow_option", {
	id: text("id").primaryKey().notNull(),
	questionId: text("question_id").notNull(),
	optionTitle: text("option_title").notNull(),
	description: text("description"),
	nextQuestionId: text("next_question_id"),
	tag: text("tag"),
	order: integer("order").default(0).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		bookingFlowOptionNextQuestionIdBookingFlowQuestionIdF: foreignKey({
			columns: [table.nextQuestionId],
			foreignColumns: [bookingFlowQuestion.id],
			name: "booking_flow_option_next_question_id_booking_flow_question_id_f"
		}).onDelete("set null"),
		bookingFlowOptionQuestionIdBookingFlowQuestionIdFk: foreignKey({
			columns: [table.questionId],
			foreignColumns: [bookingFlowQuestion.id],
			name: "booking_flow_option_question_id_booking_flow_question_id_fk"
		}).onDelete("cascade"),
	}
});