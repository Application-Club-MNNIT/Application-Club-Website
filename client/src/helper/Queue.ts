class Queue<T> {
  private items: { [key: number]: T } = {};
  private head: number = 0;
  private tail: number = 0;

  // Adds an element to the end of the queue.
  enqueue(item: T): void {
    this.items[this.tail] = item;
    this.tail++;
  }

  // Removes and returns the element at the front of the queue.
  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    const item = this.items[this.head];
    delete this.items[this.head];
    this.head++;
    // Optional: Reset pointers if the queue is empty to prevent memory leak.
    if (this.isEmpty()) {
      this.head = 0;
      this.tail = 0;
      this.items = {};
    }
    return item;
  }

  // Returns the element at the front without removing it.
  peek(): T | undefined {
    return this.items[this.head];
  }

  // Checks if the queue is empty.
  isEmpty(): boolean {
    return this.tail === this.head;
  }

  // Returns the number of elements in the queue.
  size(): number {
    return this.tail - this.head;
  }

  // Clears all elements from the queue.
  clear(): void {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }
}

export default Queue;
