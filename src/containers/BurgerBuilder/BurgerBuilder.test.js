import React from 'react';
import {BurgerBuilder} from './BurgerBuilder';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BuildControls from '../../component/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder/>', ()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper= shallow(<BurgerBuilder onInitIngredients={()=>{}}/>);
    });
    it('<BuildControl /> available if ingredients are defined', ()=>{
        wrapper.setProps({ings:{salad:0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
})
