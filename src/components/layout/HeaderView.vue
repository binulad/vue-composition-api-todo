<template>
  <header>
    <nav class="navbar navbar-dark px-2 navbar-expand-md bg-success">
      <div class="container">
        <a class="navbar-brand" href="#">TodoBar</a>
        <button
          class="navbar-toggler fs-6 px-1"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav ms-auto mb-2 mb-md-0">
            <li class="nav-item">
              <RouterLink to="/" class="nav-link" active-class="active"
                >Home</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink to="/todo" class="nav-link" active-class="active"
                >Todo</RouterLink
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
</script>