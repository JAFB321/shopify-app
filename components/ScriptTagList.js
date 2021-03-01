import gql from 'graphql-tag';
import { useQuery, useMutation } from 'react-apollo';
import { Card, Button, ResourceList, Stack, ResourceItem } from '@shopify/polaris';

const CREATE_SCRIPT_TAG = gql`
mutation AddScriptTag($Script: ScriptTagInput!){
    scriptTagCreate(input: $Script){
      scriptTag{
        id
        src
        createdAt
        displayScope
      }
      userErrors{
        field
        message
      }
    }
  }
`;

const GET_SCRIPT_TAGS = gql`
query getScriptTags {
    scriptTags(first:30) {
      edges {
        node {
          id
          src
        }
      }
    }
  }
`;

const DELETE_SCRIPT_TAG = gql`
mutation scriptTagDelete($id: ID!) {
  scriptTagDelete(id: $id) {
    deletedScriptTagId
    userErrors {
      field
      message
    }
  }
}
`;



export const ScriptTagList = () => {

  const { data, error, loading } = useQuery(GET_SCRIPT_TAGS);
  
  const [createScript] = useMutation(CREATE_SCRIPT_TAG, {
    refetchQueries: [{ query: GET_SCRIPT_TAGS }]
  });
  const [deleteScript] = useMutation(DELETE_SCRIPT_TAG, {
    refetchQueries: [{ query: GET_SCRIPT_TAGS }]
  });

  if (error) return <div>Error...</div>
  if (loading) return <div>Loading...</div>

  const items = data.scriptTags.edges;

  return (
    <Card title="Manage your Scripts" sectioned>
      <ResourceList
        showHeader
        
        resourceName={{ singular: 'Script', plural: 'Scripts' }}
        items={items.map((item) => item.node)}
        renderItem={(item) => {
          return (
            <ResourceList.Item id={item.id} accessibilityLabel="Asd">
              <Stack>
                <Stack.Item fill>
                  <p>{item.src && item.src.split('/').pop()}</p>
                </Stack.Item>
                <Stack.Item >
                  <p>{item.src}</p>
                </Stack.Item>
              </Stack>
            </ResourceList.Item>
          );
        }}
      />
    </Card>
  )
}
