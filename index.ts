class Stack {
  private numberOfStacks: number = 3;
  private stackCapacity: number;
  private values: number[];
  private sizes: number[];

  constructor(stackSize: number) {
    this.stackCapacity = stackSize;
    this.values = new Array(stackSize * this.numberOfStacks);
    this.sizes = new Array(this.numberOfStacks).fill(0);
  }

  /**
   * Adds new element
   * @param {number} stackNumber
   * @param {number} value
   * @returns Void
   */
  push(stackNumber: number, value: number): void {
    if (this.isFull(stackNumber)) {
      console.info('The stack is full');
      return;
    }

    const cloneStackNum = stackNumber == 1 ? 0 : stackNumber - 1;

    this.sizes[cloneStackNum]++;
    this.values[this.indexOfTop(cloneStackNum)] = value;
  }

  /**
   * Removes the last element and returns it back to the caller
   * @param stackNumber 
   * @returns If the stack is not empty returns the value otherwise prints a message
   */
  pop(stackNumber: number): number | void {
    if (this.isEmpty(stackNumber)) {
      console.info('The stack is empty');
      return;
    }

    const cloneStackNum = stackNumber == 1 ? 0 : stackNumber - 1;

    const topIndex = this.indexOfTop(cloneStackNum);
    const value = this.values[topIndex];

    this.values[topIndex] = 0;
    this.sizes[cloneStackNum]--;

    return value;
  }

  /**
   * Returns the last element in the stack without remove it
   * @param stackNumber 
   * @returns If the stack is not empty returns the value otherwise prints a message
   */
  peek(stackNumber: number): number | void {
    if (this.isEmpty(stackNumber)) {
      console.info('The stack is empty');
      return;
    }

    const cloneStackNum = stackNumber == 1 ? 0 : stackNumber - 1;
    return this.values[this.indexOfTop(cloneStackNum)];
  }

  /**
   * Prints the elements of specific stack
   * @param stackNumber 
   * @returns If the stack is not empty prints the elements otherwise prints a message
   */
  print(stackNumber: number): void {
    if (this.isEmpty(stackNumber)) {
      console.info("There's no elements");
      return;
    }

    const paginate = this.values.slice((stackNumber - 1) * this.stackCapacity, stackNumber * this.stackCapacity);
    paginate.forEach((value: number) => console.info(value));
  }

  /**
   * Checks if a specific stack is empty
   * @param stackNumber 
   * @returns If the stack is empty returns true otherwise false
   */
  isEmpty(stackNumber: number): boolean {
    const cloneStackNum = stackNumber == 1 ? 0 : stackNumber - 1;
    return this.sizes[cloneStackNum] == 0;
  }

  /**
   * Checks if a specific stack is full
   * @param stackNumber 
   * @returns If the stack is full returns true otherwise false
   */
  isFull(stackNumber: number): boolean {
    const cloneStackNum = stackNumber == 1 ? 0 : stackNumber - 1;
    return this.sizes[cloneStackNum] == this.stackCapacity;
  }

  /**
   * Returns the top element of specific stack
   * @param stackNumber 
   * @returns Number
   */
  private indexOfTop(stackNumber: number): number {
    const offset = stackNumber * this.stackCapacity;
    const size = this.sizes[stackNumber];
    return offset + size - 1;
  }
}