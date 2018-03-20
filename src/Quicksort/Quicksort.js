import React, { Component } from 'react';
import './../sort/sort.css';


/**

介绍：
快速排序是由东尼·霍尔所发展的一种排序算法。在平均状况下，排序 n 个项目要Ο(n log n)次比较。
在最坏状况下则需要Ο(n2)次比较，但这种状况并不常见。事实上，快速排序通常明显比其他Ο(n log n) 算法更快，
因为它的内部循环（inner loop）可以在大部分的架构上很有效率地被实现出来，且在大部分真实世界的数据，
可以决定设计的选择，减少所需时间的二次方项之可能性。

步骤：
  1. 从数列中挑出一个元素，称为 “基准”（Pivot），
  2. 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。
  	 在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作。
  3. 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。

**/


let history = [];

class Quicksort extends Component {
	constructor() {
		super();
		this.state = {
			arr: [1, 5, 3, 8, 10, 4, 17, 12, 6],
			swap_l: '',
			swap_r: '',
			history:[]
		}
	}

	// 第一种排序方式， 递归方式
	_sort(arr) {
		//如果数组<=1,则直接返回
			let startArr = Object.assign([], arr);
            if(arr.length<=1){return arr;}
            var pivotIndex=Math.floor(arr.length/2);
            //找基准，并把基准从原数组删除
            var pivot=arr.splice(pivotIndex,1)[0];
            //定义左右数组
            var left=[];
            var right=[];

            //比基准小的放在left，比基准大的放在right
            for(var i=0;i<arr.length;i++){
                if(arr[i]<=pivot){
                    left.push(arr[i]);
                }
                else{
                    right.push(arr[i]);
                }
            }

            return this._sort(left).concat([pivot], this._sort(right));
	}
	median3(a, b, c) {
		if(b <= a)
            if (a <= c)
                return a;
            else if(c <= b)
                return b;
            else
                return c;
        else if(c <= a)
            return a;
        else if(c <= b)
            return c;
        else
            return b;
	}
	swap(l, r) {
		let _history = history.slice();
		let arr = Object.assign([], _history.splice(_history.length - 1, 1)[0].arr);
		let temp = arr[l], swap_l = arr[l], swap_r = arr[r];
		arr[l] = arr[r];
		arr[r] = temp;
		history.push({
			arr: arr,
			swap_l: swap_l,
			swap_r: swap_r
		})
	}

	// 第二种排序方式， 循环方式
	sort(left, right) {
		let _history = history.slice();
		var values = _history.splice(_history.length - 1, 1)[0].arr;
	    var middle = (left + right) / 2 | 0;
	    var pivot = this.median3(values[left], values[middle], values[right]);
	    var l = left;
	    var r = right;
	    while(true) {
	        while(values[l] < pivot) {
	            // this.highlight(l, r);
	            l++;
	        }
	        while(pivot < values[r]) {
	            // this.highlight(l, r);
	            r--;
	        }
	        if(r <= l) {
	            break;
	        }
	        this.swap(l, r);
	        l++;
	        r--;
	    }

	    if(left < l - 1) {
	        this.sort(left, l - 1);
	    }
	    if(r + 1 < right) {
	        this.sort(r + 1, right);
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
				}, 1000);
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
        
		this.sort(0, _arr.length - 1);

		this.setStateFun();
	}

	render() {

		const _render = this.state.arr.map((num, index) => {
			let style = {
				height: num * 10 + 'px'
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

export default Quicksort;