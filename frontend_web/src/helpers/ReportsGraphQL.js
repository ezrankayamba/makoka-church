import { gql } from "apollo-boost";

export const NATURE_SUMMARY = gql`
  query natureSummary {
    natureSummary {
      name
      status
      count
    }
  }
`;

export const STATUS_SUMMARY = gql`
  query statusSummary {
    statusSummary {
      name
      count
    }
  }
`;

export const LOCATION_SUMMARY = gql`
  query getLocSummary {
    locationSummary {
      locName
      locCount
    }
  }
`;

export const KPI_SUMMARY = gql`
  query kpi {
    kpiSummary {
      name
      count
      natureName
    }
  }
`;
