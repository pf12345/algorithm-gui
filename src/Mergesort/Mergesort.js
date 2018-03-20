import React, { Component } from 'react';
import './../sort/sort.css';

/**

介绍：
归并排序（Merge sort，台湾译作：合并排序）是建立在归并操作上的一种有效的排序算法。
该算法是采用分治法（Divide and Conquer）的一个非常典型的应用

步骤：
  1. 申请空间，使其大小为两个已经排序序列之和，该空间用来存放合并后的序列
  2. 设定两个指针，最初位置分别为两个已经排序序列的起始位置
  3. 比较两个指针所指向的元素，选择相对小的元素放入到合并空间，并移动指针到下一位置
  4. 重复步骤3直到某一指针达到序列尾
  5. 将另一序列剩下的所有元素直接复制到合并序列尾

**/

let history = [];

class Mergesort extends Component {
	constructor() {
		super();
		this.state = {
			arr: [1, 5, 3, 8, 10, 4, 17, 12, 6],
			swap_l: '',
			swap_r: '' 
		}
	}

	// 另外一种排序思路
	otherMethod() {
		this.methed = {
			merge: function(arr) {
				if(arr.length === 1) {
					return arr;
				}

				let middle = arr.length / 2 | 0;
				let left_arr = arr.slice(0, middle), right_arr = arr.slice(middle);
				return this.mergeOption(this.merge(left_arr), this.merge(right_arr));
			},
			mergeOption: function(l_arr, r_arr) {
				let temp = [];
				while(l_arr.length && r_arr.length) {
					if(l_arr[0] > r_arr[0]) {
						temp.push(r_arr.shift());
					} else {
						temp.push(l_arr.shift());
					}
				}
				return temp.concat(l_arr, r_arr);
			}
		}

		// var arr = [1, 3, 7, 4, 5, 6];
		// this.methed.merge(arr)   => [1, 3, 4, 5, 6, 7]
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

		function _swap(l, r) {
			let temp = arr[l], swap_l = arr[l], swap_r = arr[r];
			arr[l] = arr[r];
			arr[r] = temp;

			history.push({
				arr: Object.assign([], arr),
				swap_l: swap_l,
				swap_r: swap_r
			})
		}

		while(l != r) {
			if(l < r) {
				_swap(l, l+1);
				l += 1;
			} else {
				_swap(l, l - 1);
				l -= 1;
			}
		}
		
	}

	merge(arr, l, middle, r) {
		let m = middle + 1;
		while(l < m && m <= r) {
			if(arr[l] > arr[m]) {
				this.swap(arr, m, l);
				m++;
			}
			l++;
		}
	}

	_merge(arr, l, r) {
		if(l >= r) {
			return;
		}
		let middle = (l + r) / 2 | 0, left = l, right = r;
		
		this._merge(arr, left, middle);
		this._merge(arr, middle + 1, right);
		this.merge(arr, l, middle, r);
	}

	sort() {
		let _history = history.slice();
		let arr = Object.assign([], _history.splice(_history.length - 1, 1)[0].arr);
		this._merge(arr, 0, arr.length - 1)
		console.log(history);
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


export default Mergesort;