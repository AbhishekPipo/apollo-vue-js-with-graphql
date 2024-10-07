<script setup>
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import { computed, watchEffect } from 'vue'

// Updated query using fields from the Author type
const ALL_BOOKS_QUERY = gql`
  query GetAllBooks {
    books {
      id
      title
      author {
        id
        firstName
        lastName
      }
    }
  }
`

// Execute the query using Apollo's useQuery composable
const { result, loading, error } = useQuery(ALL_BOOKS_QUERY)

// Computed property to access books data
const books = computed(() => result.value?.books ?? [])

// Log the books when they change
watchEffect(() => {
  if (books.value.length > 0) {
    console.log("Books data:", books.value)
  }
})
</script>

<template>
  <div>
    <h1>Books List</h1>

    <!-- Loading state -->
    <div v-if="loading">Loading books...</div>

    <!-- Error state -->
    <div v-if="error">Error fetching books: {{ error.message }}</div>

    <!-- Books List -->
    <ul v-if="!loading && !error && books.length">
      <li v-for="book in books" :key="book.id">
        {{ book.title }} by {{ book.author.firstName }} {{ book.author.lastName }}
      </li>
    </ul>

    <!-- No books available -->
    <div v-else-if="!loading && !error">
      No books available.
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 0.5rem;
}
</style>