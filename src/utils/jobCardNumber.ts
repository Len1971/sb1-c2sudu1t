// Start from ECO-12500 and increment
let currentNumber = 12500;

export function generateJobCardNumber(): string {
  return `ECO-${currentNumber++}`;
}

// Reset for development/testing purposes
export function resetJobCardNumber(): void {
  currentNumber = 12500;
}