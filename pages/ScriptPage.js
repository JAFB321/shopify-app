import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Button, Card, Layout, Page, ResourceList, Stack } from '@shopify/polaris'


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

const srcSCRIPT = 'https://jafb321testapp2.loca.lt/test-script.js';

const ScriptPage = () => {

  const { data, error, loading } = useQuery(GET_SCRIPT_TAGS);

  const [addScript, { data: addScriptData }] = useMutation(CREATE_SCRIPT_TAG, {
    refetchQueries: [{ query: GET_SCRIPT_TAGS }]
  });
  const [deleteScript, { data: delScriptData }] = useMutation(DELETE_SCRIPT_TAG, {
    refetchQueries: [{ query: GET_SCRIPT_TAGS }]
  });

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error...</div>


  return (
    <div>
      <p>
        Scripts: {data.scriptTags.edges.length}
      </p>
      {
        data.scriptTags.edges.map((item) => (
          <div key={item.node.id}>
            <p>{item.node.id}</p>
            <Button
              onClick={() => {
                deleteScript({
                  variables:{
                    id: item.node.id
                  }
                })
              }}
            >
              Delete
              </Button>
          </div>
        ))
      }
      <Button
        onClick={() => {
          addScript({
            variables: {
              Script: {
                src: srcSCRIPT,
                displayScope: 'ALL'
              }
            }
          });
        }}
      >
        Agregar
      </Button>
    </div>
  )
}

export default ScriptPage;