# Lights Out project
 
## Setup
- Clone The Repo
`git clone https://github.com/willyd332/Lights_Out_Game.git`
- Navigate Into The Repo
`cd Lights_Out_Game`
- Install Dependencies
`npm install`
- Start The Development Server
`npm start`
- Open The Game In Your Browser
> Running on http://localhost:3000
 
 
### Description
- This is a recreation of the game Lights Out, originally created by Tiger Toys in 1995.
- The game is set up with 25 tiles, all either in a *black* or *white* state. They are arranged in a 5x5 grid.
- The goal of the game is to get all of the tiles to a *black* state (i.e. Lights Out!).
- The game is played by clicking tiles. If you click a tile, that tile and all the tiles immediately adjacent (but not diagonal) to the clicked tile will change states.
 
 
# Math For Those Who Are Interested
> With help from *Lights Out:Solutions Using Linear Algebra* by Matthew A. Madsen
 
### Assumptions
- As each tile only has two states, no tile needs to be pressed more than once to complete the game. In other words, pressing a tile twice is equivalent to not pressing it at all.
- Because of this first assumption, all calculations can be done in modulo 2
- The state of a tile depends solely on whether it or its immediate neighbors have been pressed
- The order in which the tiles are pressed is irrelevant to the final result
- Pressing the same tiles used in the creation of a board will result in a return to the original state
- Therefore, by finding the tiles pressed to achieve any given state (if they exist), we have found a solution to the board
 
### Calculations
##### *All Calculations Will Be In **mod(2)***
`Let b = [b1, b2, b3, ..., b25]`
where `bi` represents the state of tile `i`, `0 = *black* and 1 = *white*`
 
`Let x = [x1, x2, x3, ..., x25]`
where `xi` represents if tile `i` was pressed, `1`, or not, `0`, in the process of creating `b`
 
Because the state of `bi` depends only on whether it or an adjacent was pressed,
`b1 = x1 + x2 + x6`
`b2 = x1 + x2 + x3 + x7`
`...`
`b25 = x20 + x24 + x25`
 
We rewrite this system as the product `Ax = b` where A is a 25x25 matrix and `A` =
```
Z I O O O
I Z I O O
O I Z I O
O O I Z I
O O O I Z
```
Where `Z` =
```
1 1 0 0 0
1 1 1 0 0
0 1 1 1 0
0 0 1 1 1
0 0 0 1 1
```
`I` is the 5x5 identity matrix and `O` is the 5x5 zero matrix
 
So, if `Ax = b` has a solution for a `b`, then that config is solvable
In other words, `b` is solvable iff `b ∈ Col(A)`
Because `A` is symmetric `Col(A)` is equal ` Row(A)` which is equal to the orthogonal complements of `Null(A)`
As `Null(A)` is not affected by elementary row operations, we will reduce to rref, `E`, to get `Null(E)`
 
So, `b` is solvable iff `b ∈ the ⊥ of Null(E)`
 
So if `A` =
```
1 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
1 1 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 1 1 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 1 1 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 1 1 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
1 0 0 0 0 1 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 1 0 0 0 1 1 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 1 0 0 0 1 1 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 1 0 0 0 1 1 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 1 0 0 0 1 1 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 1 0 0 0 0 1 1 0 0 0 1 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 1 0 0 0 1 1 1 0 0 0 1 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 1 0 0 0 1 1 1 0 0 0 1 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 1 0 0 0 1 1 1 0 0 0 1 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 1 0 0 0 1 1 0 0 0 0 1 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 1 1 0 0 0 1 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 1 1 1 0 0 0 1 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 1 1 1 0 0 0 1 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 1 1 1 0 0 0 1 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 1 1 0 0 0 0 1
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 1 1 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 1 1 1 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 1 1 1 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 1 1 1
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 1 1
```
Then the rref of `A` = `E` =
```
1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0  0   1
0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0  1   0
0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0  -1  -1
0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0  -1  0
0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0  2   1
0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0  -1  -1
0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0  0   0
0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0  1   1
0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0  0   0
0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0  -1  -1
0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0  1   0
0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0  -1  0
0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0  0   0
0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0  1   0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0  -1  0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0  1   1
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0  0   0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0  -1  -1
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0  0   0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0  1   1
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0  -2 -1
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0  1   0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1  1   1
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0  0   0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0  0   0
```
 
We translate `E` into a system (*note modulo 2*):
`e1 = e25`
`e2 = e24`
`e3 = e24 + e25`
`...`
`e24 = e24`
`e25 = e25`
 
And by drawing out the two parameters `e24` and `e25` we have the resulting basis for `Null(E)`:
 
`n1 = [0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0]`
`n2 = [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1]`
 
Thus `b` is solvable if it is orthogonal to these two vectors.
 
##### Solving A Board
 
We can see that:
`[e1, e2, e3, ..., e25] = e24*n1 + e25*n2`
 
Normally, because we have parameters, `A` would be inconsistent and have infinite solutions,
However, because we are in modulo 2, we can limit this to four potential solutions.
1. `x24 = 0` and `x25 = 0`
2. `x24 = 1` and `x25 = 0`
3. `x24 = 0` and `x25 = 1`
4. `x24 = 1` and `x25 = 1`
 
let `R` be a 25x25 matrix so that `RA = E`
> In other words, the matrix composed of the row operations to reduce `A`
 
Then I can find `x` by calculating
`Rb`
`Rb + n1`
`Rb + n2`
`Rb + n1 + n2`
 
And determining which requires the least steps...
 
But I don't want to calculate `R` ....
 
 
So really all I need to do is keep track of `X` throughout the game and then just reverse it...
