import { gql } from "apollo-boost";

export const REVENUE_SUMMARY = gql`
  query revenueSummary {
    revenueSummary {
      date
      cat
      total
    }
  }
`;
export const REVENUE_EXPENSES_SUMMARY = gql`
  query revenueExpensesSummary {
    revenueExpensesSummary {
      date
      cat
      total
    }
  }
`;
export const TITHE_SUMMARY = gql`
  query titheSummary {
    titheSummary {
      date
      total
    }
  }
`;