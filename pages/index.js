import {EmptyState, Layout, Page} from '@shopify/polaris'

const Index = () => (
    <Page>
        <Layout>
            <EmptyState
            heading="Manage yor custom products"
            action={{ content: 'Add products'}}
            secondaryAction={{content:'Learn more', url: 'https://www.google.com'}}
            image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
            >
            </EmptyState>
        </Layout>
    </Page>
);

export default Index;
