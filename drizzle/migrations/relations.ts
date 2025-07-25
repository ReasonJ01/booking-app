import { relations } from "drizzle-orm/relations";
import { user, session, account, review, bookingFlowOption, bookingFlowOptionService, service, bookingFlowQuestion } from "./schema";

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	sessions: many(session),
	accounts: many(account),
	reviews: many(review),
}));

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const reviewRelations = relations(review, ({one}) => ({
	user: one(user, {
		fields: [review.userId],
		references: [user.id]
	}),
}));

export const bookingFlowOptionServiceRelations = relations(bookingFlowOptionService, ({one}) => ({
	bookingFlowOption: one(bookingFlowOption, {
		fields: [bookingFlowOptionService.optionId],
		references: [bookingFlowOption.id]
	}),
	service: one(service, {
		fields: [bookingFlowOptionService.serviceId],
		references: [service.id]
	}),
}));

export const bookingFlowOptionRelations = relations(bookingFlowOption, ({one, many}) => ({
	bookingFlowOptionServices: many(bookingFlowOptionService),
	bookingFlowQuestion_nextQuestionId: one(bookingFlowQuestion, {
		fields: [bookingFlowOption.nextQuestionId],
		references: [bookingFlowQuestion.id],
		relationName: "bookingFlowOption_nextQuestionId_bookingFlowQuestion_id"
	}),
	bookingFlowQuestion_questionId: one(bookingFlowQuestion, {
		fields: [bookingFlowOption.questionId],
		references: [bookingFlowQuestion.id],
		relationName: "bookingFlowOption_questionId_bookingFlowQuestion_id"
	}),
}));

export const serviceRelations = relations(service, ({many}) => ({
	bookingFlowOptionServices: many(bookingFlowOptionService),
}));

export const bookingFlowQuestionRelations = relations(bookingFlowQuestion, ({many}) => ({
	bookingFlowOptions_nextQuestionId: many(bookingFlowOption, {
		relationName: "bookingFlowOption_nextQuestionId_bookingFlowQuestion_id"
	}),
	bookingFlowOptions_questionId: many(bookingFlowOption, {
		relationName: "bookingFlowOption_questionId_bookingFlowQuestion_id"
	}),
}));