import React, { Component } from 'react';
import './../sort/sort.css';


/**

介绍：
希尔排序，也称递减增量排序算法，是插入排序的一种高速而稳定的改进版本。

希尔排序是基于插入排序的以下两点性质而提出改进方法的：
1、插入排序在对几乎已经排好序的数据操作时， 效率高， 即可以达到线性排序的效率
2、但插入排序一般来说是低效的， 因为插入排序每次只能将数据移动一位<

**/


let history = [];

class Shellsort extends Component {
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
		let arr_len = arr.length;
		var gap = 1;
	    while(gap < arr_len) {
	        gap = gap * 3 + 1;
	    }

	    while(1 < gap) {
	        gap = gap / 3 | 0;
	        for(var i = gap; i < arr_len; i++) {
	            for(var k = i; 0 < k; k -= gap) {
	                if(arr[k - gap] > arr[k]) {
	                    this.swap(arr, k - gap, k);
	                }
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

export default Shellsort;