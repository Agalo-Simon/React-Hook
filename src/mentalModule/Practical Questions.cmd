
//==============================Morning=================================//

Large List with Filtering: (Morning session)
Build a React component that:

Renders a list of 200 items
Includes a text input field to filter displayed items
Optimizes performance using React hooks
API to Use
Use this public API to fetch product data:
https://api.escuelajs.co/api/v1/products
Fetch the products and use the first 200 items as your dataset.
Requirements
Your component should:

Fetch products from the API
Display up to 200 items
Provide a text input where users can filter products by title
Optimize performance using:
useMemo — for filtering logic
useCallback — for handling input change events
Expected Behavior
On load, the component fetches products from the API and displays them.
When the user types in the search input, the list updates to show only matching products.
Filtering is optimized using useMemo to avoid unnecessary recalculations.


//==============================Afternoon=================================//

Fetch Users and Posts with a Custom Hook (Afternoon session)
Build a React application that fetches data from two API endpoints at the same time and displays posts based on a selected user.

APIs to Use
Fetch data from the following endpoints:
Users APIhttps://jsonplaceholder.typicode.com/users
Posts APIhttps://jsonplaceholder.typicode.com/posts

Requirements
Create a custom React hook called useUsersPosts.
The hook should:
fetch 'users' and 'posts' from the two endpoints
handle:loading state
error state
Return the following from the hook:
users
posts
loading
error
In your component:
display a dropdown or input field to select a 'userId'
display only the posts belonging to the selected user
Filtering
Use the condition:
post.userId === selectedUserId
to filter posts belonging to that user.

Display Behavior
Your UI should:

show "Loading..." while fetching data
show "an error message" if fetching fails
show the "list of users"
show "posts belonging to the selected user"
Goal of the Exercise
This exercise helps students practice:

creating custom React hooks
fetching data from multiple APIs
handling loading and error states
filtering data
working with React state and effects

Answer
