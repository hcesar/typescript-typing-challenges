//FIX ME: Replace string type by a lowercase only string type
export function createElement(tagName: string) {

}

createElement("my-tag"); // OK
createElement("MY-TAG"); // Error: Tag name should be in lowercase
