import React, { Component } from 'react';
import './../sort/sort.css';

/**

介绍：
冒泡排序（Bubble Sort，台湾译为：泡沫排序或气泡排序）是一种简单的排序算法。
它重复地走访过要排序的数列，一次比较两个元素，如果他们的顺序错误就把他们交换过来。
走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。
这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端。

步骤：
  1. 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
  2. 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。在这一点，最后的元素应该会是最大的数。
  3. 针对所有的元素重复以上的步骤，除了最后一个。
  4. 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。

**/

let history = [];

class BubbleSort extends Component {
	constructor() {
		super();
		this.state = {
			arr: [1, 5, 3, 8, 10, 4, 17, 12, 6],
			swap_l: '',
			swap_r: '' 
		}
	}

	setHistory(arr, l, r) {
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
		for(let i = 0, _i = arr.length - 1; i < _i; i++) {
			for(let j = 0, _j = arr.length - i; j < _j; j++) {
				if(arr[j] > arr[j + 1]) {
					this.setHistory(arr, j, j + 1);
				}
			}
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

	run() {
		let _arr = Object.assign([], this.state.arr);

		history.push({ arr: _arr.slice() })

		this.sort();

		this.setStateFun();

	}

	render() {
			// console.log(this.state.arr)
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

export default BubbleSort;