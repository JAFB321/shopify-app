import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

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
    scriptTags(first:10) {
      edges {
        node {
          id
          src
        }
      }
    }
  }
`;

const SCRIPT = 'https://jafb321testing.loca.lt/test-script.js';

const ScriptPage = () => {

    const { data, error, loading } = useQuery(GET_SCRIPT_TAGS);
    const [addScript, { data: addScriptData }] = useMutation(CREATE_SCRIPT_TAG);

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error...</div>

    console.log(data);

    return (
        <div>
            <h1>Hello this is the Script Page</h1>
        </div>
    )
}

export default ScriptPage;