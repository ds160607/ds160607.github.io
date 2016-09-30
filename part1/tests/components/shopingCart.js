import React from 'react'
import { shallow } from 'enzyme'
import ShopingCart from '../../src/components/ShopingCart'

function setup() {
    const props = {
        addTodo: spy(),
        sortKey: '',
        sortDirection: 0,
        itemsById: {
            '0': {
                'id': '0',
                'cartId': 0,
                'name': 'a item name',
                'price': 10.0,
                'qty': 3
            }
        },
        items: ['0'],
        actions: {
            removeCartItem: spy(),
            updateCartItemQTY: spy(),
            toggleSorting: spy()
        }
    }

    const enzymeWrapper = shallow(<ShopingCart {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('components', () => {
    describe('ShopingCart', () => {
        it('should render self and subcomponents', () => {
            const { enzymeWrapper } = setup()

            expect(enzymeWrapper.find('table')).to.have.length(1);

            const shopingCartItemProps = enzymeWrapper.find('ShopingCartItem').props();
            expect(shopingCartItemProps.name).to.be.equal('a item name');
            expect(shopingCartItemProps.price).to.be.equal(10.0);
            expect(shopingCartItemProps.qty).to.be.equal(3);

            //TODO more test
        })        
    })

    //TODO test other components
    
})