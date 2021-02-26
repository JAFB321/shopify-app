import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Button, Card, Layout, Page, ResourceList, Stack } from '@shopify/polaris'
import { ScriptTagList } from '../components/ScriptTagList';


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

  // const { data, error, loading } = useQuery(GET_SCRIPT_TAGS);

  // const [addScript, { data: addScriptData }] = useMutation(CREATE_SCRIPT_TAG, {
  //   refetchQueries: [{ query: GET_SCRIPT_TAGS }]
  // });
  // const [deleteScript, { data: delScriptData }] = useMutation(DELETE_SCRIPT_TAG, {
  //   refetchQueries: [{ query: GET_SCRIPT_TAGS }]
  // });

  // if (loading) return <div>Loading...</div>
  // if (error) return <div>Error...</div>


  return (
    <Page>
      <Layout >
        <ScriptTagList />
      </Layout>
    </Page>
  )
}

export default ScriptPage;