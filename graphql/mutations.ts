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

export const INSERT_MESSAGE = gql`
  mutation InsertMessage($chat_session_id: Int!, $content: String!, $sender: String!, $created_at: DateTime!) {
    insertMessages(content: $content, created_at: $created_at, sender: $sender, chat_session_id: $chat_session_id) {
      id
      content
      created_at
      sender
    }
  }
`;

export const INSERT_GUEST = gql`
  mutation InsertGuest($name: String!, $email: String!, $created_at: DateTime!) {
    insertGuests(created_at: $created_at, name: $name, email: $email) {
      id
    }
  }
`;

export const INSERT_CHAT_SESSION = gql`
  mutation InsertChatSession($chatbot_id: Int!, $guest_id: Int!, $created_at: DateTime!) {
    insertChat_sessions(created_at: $created_at, chatbot_id: $chatbot_id, guest_id: $guest_id) {
      id
    }
  }
`;
