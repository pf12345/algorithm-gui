import React, { Component } from 'react';
import './../sort/sort.css';


/**

介绍：
选择排序(Selection sort)是一种简单直观的排序算法。

它的工作原理如下:
首先在未排序序列中找到最小元素，存放到排序序列的起始位置，
然后，再从剩余未排序元素中继续寻找最小元素，然后放到已经排序序列末尾。
以此类推，直到所有元素均排序完毕。

**/


let history = [];

class Selectionsort extends Component {
	constructor() {
		super();
		this.state = {
			arr: [1, 5, 3, 8, 10, 4, 17, 12, 6],
			swap_l: '',
			swap_r: '' 
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
		let newArr = [], arr_len = arr.length;
		for(let j = 0, _j = arr_len - 1; j < _j; j++) {
			let min = j;
			for(let i = j + 1; i < arr_len; i++) {
				if(arr[min] > arr[i]) {
					min = i;
				}
			}
			if(j != min) {
				this.swap(arr, j, min);
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

export default Selectionsort;