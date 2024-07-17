import { gql } from "@apollo/client";

export const CREATE_CHATBOT = gql`
  mutation CreateChatbot($clerk_user_id: String!, $name: String!, $created_at: DateTime!) {
    insertChatbots(clerk_user_id: $clerk_user_id, name: $name, created_at: $created_at) {
      id, 
      name
    }
  }
`;

export const REMOVE_CHARACTERISTIC = gql`
  mutation RemoveCharacteristics($characteristicId: Int!) {
    deleteChatbot_characteristics(id: $characteristicId) {
      id
    }
  }
`;

export const DELETE_CHATBOT = gql`
  mutation DeleteChatbot($id: Int!) {
    deleteChatbots(id: $id) {
      id
    }
  }
`;

export const ADD_CHARACTERISTIC = gql`
  mutation AddCharacteristic($chatbotId: Int!, $content: String!, $createdAt: DateTime!) {
  insertChatbot_characteristics(content: $content, created_at: $createdAt, chatbot_id: $chatbotId) {
    id
    content
    created_at
  }
}
`;

export const UPDATE_CHATBOT = gql`
  mutation UpdateChatbot($id: Int!, $name: String!) {
    updateChatbots(id: $id, name: $name) {
      id
      name
      created_at
    }
}`;
