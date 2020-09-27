import { gql } from "apollo-boost";

export const COMPLAINTS = gql`
  query fetchComplaints(
    $pageNo: Int
    $pageSize: Int
    $clientName: String
    $location: Int
    $nature: Int
    $status: String
  ) {
    complaints(
      pageNo: $pageNo
      pageSize: $pageSize
      clientName: $clientName
      location: $location
      nature: $nature
      status: $status
    ) {
      id
      clientName
      location {
        id
        name
      }
      openDate
      status
      details
      rca
      actionPlan
      results
      financialImpact
      costCenter
      responsiblePerson
      dueDate
      closeDate
      assignedTo {
        id
        username
      }
      nature {
        id
        name
      }
    }
  }
`;

export const GET_COMPLAINT = gql`
  query getComplaint($id: ID!) {
    complaint(id: $id) {
      id
      clientName
      openDate
      status
      details
      rca
      actionPlan
      results
      financialImpact
      costCenter
      responsiblePerson
      dueDate
      nature {
        id
        name
      }
      location {
        id
        name
      }
      assignedTo {
        id
        username
      }
      assignedAt
      closedBy {
        id
        username
      }
      closeDate
    }
  }
`;

export const NATURES = gql`
  query getNatures {
    natures {
      id
      name
    }
  }
`;
export const COMPLAINT_ATTACHMENTS = gql`
  query getComplAttachments($complaint_id: ID!) {
    complaintAttachments(complaintId: $complaint_id) {
      id
      file
    }
  }
`;
export const LOCATIONS = gql`
  query getLocations {
    locations {
      id
      name
    }
  }
`;

export const REGISTER_COMPLAINT = gql`
  mutation createComplaint(
    $details: String!
    $clientName: String!
    $openDate: DateTime!
    $nature: ID!
    $location: ID!
    $attachments: [FileType]
  ) {
    registerComplaint(
      details: $details
      clientName: $clientName
      nature: $nature
      location: $location
      openDate: $openDate
      attachments: $attachments
    ) {
      complaint {
        id
      }
    }
  }
`;

export const UPDATE_ASSIGN_COMPLAINT = gql`
  mutation assignTo($id: ID!, $userId: ID!) {
    assignComplaint(id: $id, userId: $userId) {
      complaint {
        id
        details
        assignedTo {
          id
          username
        }
      }
    }
  }
`;

export const UPDATE_DETAILS_COMPLAINT = gql`
  mutation updateDetails(
    $id: ID!
    $rca: String!
    $actionPlan: String!
    $results: String!
    $financialImpact: String!
    $costCenter: String!
    $responsiblePerson: String!
    $attachments: [FileType]
  ) {
    updateComplaint(
      id: $id
      rca: $rca
      actionPlan: $actionPlan
      results: $results
      financialImpact: $financialImpact
      costCenter: $costCenter
      responsiblePerson: $responsiblePerson
      attachments: $attachments
    ) {
      complaint {
        id
        details
      }
    }
  }
`;

export const SEND_FEEDBACK = gql`
  mutation sendFeedback(
    $attachments: [FileType]
    $id: ID!
    $email: String!
    $remarks: String
  ) {
    feedback(
      attachments: $attachments
      id: $id
      email: $email
      remarks: $remarks
    ) {
      complaint {
        id
        clientName
      }
    }
  }
`;

export const GET_STATUSES = gql`
  query getStatuses {
    statuses {
      id
      name
    }
  }
`;
