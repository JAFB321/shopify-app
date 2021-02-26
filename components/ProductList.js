import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Card, ResourceList, Stack, TextStyle, Thumbnail } from '@shopify/polaris';
import { storeKeyNameFromField } from '@apollo/client/utilities';
import store from 'store-js'

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

  const { loading, error, data } = useQuery(GET_PRODUCTS_BY_ID, {
    variables: {
      ids: store.get('ids')
    }
  });

  if (loading) return <div></div>
  if (error) return <div></div>

  const { nodes } = data;

  return (
    <>
      <Card>
        <ResourceList
          showHeader
          resourceName={{ singular: 'Product', plural: 'Products' }}
          items={nodes}
          renderItem={(item) => {

            const featuredImage = item.images.edges[0];
            const firstVariant = item.variants.edges[0];
            const media = (
              <Thumbnail
                source={
                  featuredImage ? featuredImage.node.originalSrc : ''
                }
                alt={
                  featuredImage ? featuredImage.node.altText : ''
                }
              />
            );

            const price = firstVariant ? firstVariant.node.price : 0;

            return (
              <ResourceList.Item
                id={item.id}
                media={media}
                accessibilityLabel={`View details for ${item.title}`}
              >
                <Stack alignment="center">
                  <Stack.Item fill >
                    <h3>
                      <TextStyle variation="strong">
                        {item.title}
                      </TextStyle>
                    </h3>
                  </Stack.Item>
                  <Stack.Item >
                    <p>${price}</p>
                  </Stack.Item>
                </Stack>
              </ResourceList.Item>
            );
          }}
        />
      </Card>
    </>
  )
}
