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


    console.log('render')
    if (error) return <div>Error...</div>
    if (loading) return <div>Loading...</div>

    console.log(data)
    const items = data.scriptTags.edges;
    console.log(items); 

    return (
        <Card>
            asd
            <ResourceList
                showHeader
                resourceName={{ singular: 'Script', plural: 'Scripts' }}
                items={items.map((item) => item.node)}
                renderItem={(item) => {
                    return (
                        <ResourceList.Item id={item.id} accessibilityLabel="Asd">
                            <h1>{item.src}</h1>
                        </ResourceList.Item>
                    );
                }}
            />
        </Card>
    )
}
