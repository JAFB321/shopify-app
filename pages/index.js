import React, { useState } from 'react';
import { EmptyState, Layout, Page } from '@shopify/polaris';
import { ResourcePicker } from '@shopify/app-bridge-react';
import store from 'store-js';
import { ProductList } from '../components/ProductList';

const Index = () => {

    const [modal, setModal] = useState({
        open: false
    })
    const emptyState = !store.get('ids');

    const handleSelection = (resources) => {
        const resorucesIds = resources.selection.map((product) => product.id);
        setModal({ open: false });
        store.set('ids', resorucesIds);
        console.log(resorucesIds);
        console.log(store.get('ids'));
    }

    return (
        <Page>
            <Layout>
                <ResourcePicker
                    resourceType="Product"
                    showVariants={false}
                    open={modal.open}
                    onCancel={() => setModal({ open: false })}
                    onSelection={handleSelection}
                />
                {emptyState
                    ?
                    <EmptyState
                        heading="Manage yor custom products"
                        action={{
                            content: 'Add products',
                            onAction: () => setModal({ open: true })
                        }}
                        image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
                    >
                    </EmptyState>
                    :
                    <ProductList></ProductList>
                }
            </Layout>
        </Page>
    );
}

export default Index;
