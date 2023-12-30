import React, { useState, useEffect } from 'react'

import { BiSearchAlt2, BiFilter } from "react-icons/bi";

import './SearchAndFilter.scss'
import Checkbox from '../UI/checkbox/Checkbox';
// import { Form } from 'react-router-dom';

import { useDispatch} from 'react-redux'
// import { LOADING } from '../../constants/commonConstants'
import { getFormData } from '../../actions/filterActions';

const SearchAndFilter = () => {

    const [formData, setFormData] = useState({});

    const toggleFilter = () => {
        const myFilter = document.getElementById("myFilterSection")
        myFilter.classList.toggle('filter__clicked')
        const mySearchAndFilter = document.getElementById("searchAndFilterSection")
        mySearchAndFilter.classList.toggle('searchAndFilter__clicked')
    }

    function getFilterData(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formValues = Object.fromEntries(formData.entries());
        // console.log(formValues);
        setFormData(formValues);
        // toggleFilter();
    }

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFormData(formData));
        // console.log(formData)
    }, [dispatch,formData])

    return (
        <form id='searchAndFilterSection' onSubmit={getFilterData} className='searchAndFilter'>
            <div className='search'>
                <div className='search__box'>
                    <div className='search__outer'>
                        <div className='search__inner'>
                            <input name='keyword' className='search__area' type='text' placeholder='Search...' />
                            <button className='search__icon'><BiSearchAlt2 /></button>
                        </div>
                    </div>
                </div>
                <div className='filter__button'>
                    <button type='button' onClick={toggleFilter}>Apply Filter <span><BiFilter size="25px" /></span> </button>
                </div>
            </div>
            <div className='filter'>
                <div id='myFilterSection' className='filter__section'>
                    <div className='filter__options'>
                        <h4>Select Difficulty</h4>
                        <Checkbox name="Basic" value="Basic" color="#821D30"></Checkbox>
                        <Checkbox name="Easy" value="Easy" color="#821D30"></Checkbox>
                        <Checkbox name="Medium" value="Medium" color="#821D30"></Checkbox>
                        <Checkbox name="Hard" value="Hard" color="#821D30"></Checkbox>
                    </div>
                    <div className='filter__options '>
                        <h4>Select Topics</h4>
                        <div className='filter__topic__parts'>
                            <span>
                                <Checkbox name="Arrays" value="Arrays" color="#189AB4"></Checkbox>
                                <Checkbox name="Linked_List" value="Linked List" color="#189AB4"></Checkbox>
                                <Checkbox name="Stack" value="Stack" color="#189AB4"></Checkbox>
                                <Checkbox name="Queue" value="Queue" color="#189AB4"></Checkbox>
                                <Checkbox name="Recursion" value="Recursion" color="#189AB4"></Checkbox>
                                <Checkbox name="Binary_Tree" value="Binary Tree" color="#189AB4"></Checkbox>
                            </span>
                            <span>
                                <Checkbox name="Greedy_Algorithm" value="Greedy Algorithm" color="#189AB4"></Checkbox>
                                <Checkbox name="Binary_Search" value="Binary Search" color="#189AB4"></Checkbox>
                                <Checkbox name="Binary_Search_Tree" value="Binary Search Tree" color="#189AB4"></Checkbox>
                                <Checkbox name="Graph" value="Graph" color="#189AB4"></Checkbox>
                                <Checkbox name="Trie" value="Trie" color="#189AB4"></Checkbox>
                                <Checkbox name="Dynamic_Programming" value="Dynamic Programming" color="#189AB4"></Checkbox>
                            </span>
                        </div>
                    </div>
                    <div className='filter__options filter__limit'>
                        <label htmlFor="limit">Result Per Page</label>
                        <input type="number" name='limit' min={1} max={18} defaultValue={12} className='filter__pageLimit' />
                        <div>
                            <button type="submit" onClick={toggleFilter}>Apply Current Filter</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default SearchAndFilter

