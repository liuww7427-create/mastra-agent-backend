import { gql } from 'graphql-tag';

export const typeDefs = gql`
  enum BabyStage {
    NEWBORN
    INFANT
    TODDLER
  }

  type BabyTip {
    id: ID!
    title: String!
    description: String!
    category: String!
  }

  type CarePlan {
    summary: String!
    feedingFocus: String!
    sleepFocus: String!
    playFocus: String!
    developmentFocus: String!
    reminders: [String!]!
  }

  type AgentAnswer {
    message: String!
    highlights: [String!]!
  }

  input CareProfileInput {
    name: String!
    babyAgeWeeks: Int!
    babyStage: BabyStage!
    focusAreas: [String!]!
  }

  input AskAgentInput {
    question: String!
    profile: CareProfileInput!
  }

  type Query {
    dailyTips(profile: CareProfileInput!): [BabyTip!]!
    carePlan(profile: CareProfileInput!): CarePlan!
  }

  type Mutation {
    askAgent(input: AskAgentInput!): AgentAnswer!
  }
`;
