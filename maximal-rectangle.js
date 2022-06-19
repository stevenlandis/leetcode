/*
Given a rows x cols binary matrix filled with 0s and 1s, find the largest rectangle containing only 1s and return its area.

Input
matrix = [
	['1','0','1','0','0'],
	['1','0','1','1','1'],
	['1','1','1','1','1'],
	['1','0','0','1','0'],
]
Output: 6
*/

function maximalRectangle(m) {

}

function naive(m) {
	let w = m[0].length;
	let h = m.length;
	let maxArea = -Infinity;
	for (let x = 0; x < w; x++) {
		for (let y = 0; y < h; y++) {
			for (let wi = 1; wi <= w - x; wi++) {
				for (let hi = 1; hi <= h - y; hi++) {
					let allOne = true;
					for (let xi = x; xi < x + wi; xi++) {
						for (let yi = y; yi < y + hi; yi++) {
							if (m[yi][xi] !== '1') {
								allOne = false;
							}
						}
					}
					if (allOne) {
						maxArea = Math.max(maxArea, wi*hi);
					}
				}
			}
		}
	}
	return maxArea;
}

(()=>{
	let matrix = [
		['1','0','1','0','0'],
		['1','0','1','1','1'],
		['1','1','1','1','1'],
		['1','0','0','1','0'],
	];
	let area = naive(matrix);
	console.log(area);
})()
