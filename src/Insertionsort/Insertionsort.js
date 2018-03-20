import React, { Component } from 'react';
import './../sort/sort.css';

/**

介绍：
插入排序（Insertion Sort）的算法描述是一种简单直观的排序算法。
它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。
插入排序在实现上，通常采用in-place排序（即只需用到O(1)的额外空间的排序），因而在从后向前扫描过程中，
需要反复把已排序元素逐步向后挪位，为最新元素提供插入空间。

步骤：
  1. 从第一个元素开始，该元素可以认为已经被排序
  2. 取出下一个元素，在已经排序的元素序列中从后向前扫描
  3. 如果该元素（已排序）大于新元素，将该元素移到下一位置
  4. 重复步骤3，直到找到已排序的元素小于或者等于新元素的位置
  5. 将新元素插入到该位置中
  6. 重复步骤2

**/

let history = [];


class Insertionsort extends Component {
	constructor() {
		super();
		this.state = {
			arr: [1, 5, 3, 8, 10, 4, 17, 12, 6],
			swap_l: '',
			swap_r: '' 
		}
	}

	setStateFun() {
		if(history.length) {
			let h = history.splice(0, 1)[0];
			this.setState({
				'swap_l': h.swap_l,
				'swap_r': h.swap_r
			})
			setTimeout(() => {
				this.setState({
					'arr': Object.assign([], h.arr),
				})
				setTimeout(() => {
					this.setStateFun();
				}, 500);
			}, 1000);
		} else {
			this.setState({
				'swap_l': '',
				'swap_r': ''
			})
			alert('排序完成');
		}
	}

	swap(arr, l, r) {
		let temp = arr[l], swap_l = arr[l], swap_r = arr[r];
		arr[l] = arr[r];
		arr[r] = temp;

		history.push({
			arr: Object.assign([], arr),
			swap_l: swap_l,
			swap_r: swap_r
		})
	}

	sort() {
		let _history = history.slice();
		let arr = Object.assign([], _history.splice(_history.length - 1, 1)[0].arr);
		for(let i = 0, _i = arr.length; i < _i; i++) {
			for(let k = i; k > 0; k--) {
				if(arr[k-1] > arr[k]) {
					this.swap(arr, k-1, k);
				}
			}
		}
	}

	run() {
		let _arr = Object.assign([], this.state.arr);

		history.push({ arr: _arr.slice() })

		this.sort();

		this.setStateFun();
	}

	render() {
		const _render = this.state.arr.map((num, index) => {
			let style = {
				height: num * 15 + 'px'
			}
			if(num === this.state.swap_l || num === this.state.swap_r) {
				style['backgroundColor'] = 'red';
			}
			return (<p style={style} key={num}><span>{num}</span></p>);
		})
		return (
			<div>
				<div className="Quicksort">
					{_render}
				</div>
				<button className="sortBtn" onClick={() => {this.run()}}>sort</button>
			</div>	
		)
	}
}


export default Insertionsort;