import { useState } from 'react'
import { Input, Button } from "antd";
import _debounce from 'lodash/debounce'
import { drawBinaryTree } from 'binary-tree-visualizer';
import BinaryTree from './binaryTree'

import styles from './App.module.css'
import './App.css'

function App() {
  const [text, setText] = useState('')
  // Init a new root binary tree node

  const handleTextChange = (e) => setText(e.target.value)

  const handleEnter = () => {
    const arr = text.replaceAll('[', '').replaceAll(']', '').replaceAll(/\s/g, '').split(',')
    if (arr.some(v => v !== "")) {
      const tree = BinaryTree.from(arr)
      // @ts-ignore
      drawBinaryTree(tree.drawRoot, document.querySelector('canvas'), { maxWidth: 1280 });
    }
  }

  return (
    <div>
      <h2>Binary Tree Visualizer</h2>
      <div>
        <Input className={styles.input} placeholder='1,2,3,4,5,6' value={text} onChange={handleTextChange} onPressEnter={handleEnter} />
        <Button className={styles.btn} type='primary' onClick={handleEnter}>Draw</Button>
      </div>

      <canvas className={styles.canvas}></canvas>
    </div>
  )
}

export default App
