import { pgTable, text, timestamp, boolean, integer, serial } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: boolean('email_verified').$defaultFn(() => false).notNull(),
	image: text('image'),
	createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
	updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
	role: text('role').default("user"),
	banned: boolean('banned'),
	banReason: text('ban_reason'),
	banExpires: timestamp('ban_expires')
});

export const session = pgTable("session", {
	id: text('id').primaryKey(),
	expiresAt: timestamp('expires_at').notNull(),
	token: text('token').notNull().unique(),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
	impersonatedBy: text('impersonated_by')
});

export const account = pgTable("account", {
	id: text('id').primaryKey(),
	accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	idToken: text('id_token'),
	accessTokenExpiresAt: timestamp('access_token_expires_at'),
	refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
	scope: text('scope'),
	password: text('password'),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull()
});

export const verification = pgTable("verification", {
	id: text('id').primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expires_at').notNull(),
	createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()),
	updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date())
});

export const faq = pgTable("faq", {
	id: text('id').primaryKey(),
	question: text('question').notNull(),
	answer: text('answer').notNull(),
	order: integer('order').default(0).notNull(),
	createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()),
	updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date())
});

export const review = pgTable("review", {
	id: text('id').primaryKey(),
	comment: text('comment').notNull(),
	userId: text('user_id').references(() => user.id, { onDelete: "set null" }),
	name: text('name'),
	createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()),
	updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()),
	isApproved: boolean('is_approved').default(false).notNull(),
	reviewDate: timestamp('review_date').$defaultFn(() => /* @__PURE__ */ new Date())
});

export const image = pgTable("image", {
	id: text('id').primaryKey(),
	url: text('url').notNull(),
	createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()),
	updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()),
	carousel: boolean('carousel').default(false).notNull(),
});

export const service = pgTable("service", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	description: text().notNull(),
	price: integer().notNull(),
	duration: integer().notNull(),
	preBufferMinutes: integer().notNull(),
	postBufferMinutes: integer().notNull(),
	overridePreBuffer: boolean().notNull().default(false),
	overridePostBuffer: boolean().notNull().default(false),
	hash: text().notNull(),
	showOnWebsite: boolean().notNull().default(true),
	createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()),
	updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()),

});

export const bookingFlowQuestion = pgTable("booking_flow_question", {
	id: text('id').primaryKey(),
	text: text('text').notNull(),
	order: integer('order').default(0).notNull(),
	createdAt: timestamp('created_at').$defaultFn(() => new Date()),
	updatedAt: timestamp('updated_at').$defaultFn(() => new Date()),
});

export const bookingFlowOption = pgTable("booking_flow_option", {
	id: text('id').primaryKey(),
	questionId: text('question_id').notNull().references(() => bookingFlowQuestion.id, { onDelete: 'cascade' }),
	optionTitle: text('option_title').notNull(),
	description: text('description'),
	nextQuestionId: text('next_question_id').references(() => bookingFlowQuestion.id, { onDelete: 'set null' }),
	tag: text('tag'),
	order: integer('order').default(0).notNull(),
	createdAt: timestamp('created_at').$defaultFn(() => new Date()),
	updatedAt: timestamp('updated_at').$defaultFn(() => new Date()),
});

export const bookingFlowOptionService = pgTable("booking_flow_option_service", {
	optionId: text('option_id').notNull().references(() => bookingFlowOption.id, { onDelete: 'cascade' }),
	serviceId: text('service_id').notNull().references(() => service.id, { onDelete: 'cascade' }),
}, (table) => ({
	pk: [table.optionId, table.serviceId],
}));