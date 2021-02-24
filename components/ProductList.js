import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import {Card, ResourceList, Stack, TextStyle, Thumbnail} from '@shopify/polaris';

const GET_PRODUCTS_BY_ID = gql`
query getProductByIds($ids: [ID!]!){
    nodes(ids: $ids){
      ...on Product{
        title
        handle
        id
        images(first: 1){
          edges{
            node{
              originalSrc
              altText
            }
          }
        }
        variants(first: 1){
          edges{
            node{
              price
              id
            }
          }
        }
      }
    }
  }
`;

export const ProductList = () => {

  return (
    <>
        
    </>
  )
}
