<template>
    <b-navbar toggleable="sm" type="dark" sticky>
        <b-navbar-brand href="#">
            <img src="" width="32" height="32" alt=""> RanolP Page
        </b-navbar-brand>

        <b-navbar-toggle target="nav_collapse" />

        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
                <b-nav-item to="/" exact>
                    Index
                </b-nav-item>
                <b-nav-item to="/about">
                    About
                </b-nav-item>
                <b-nav-item to="/philosophy">
                    Philosophy
                </b-nav-item>
                <b-nav-item to="/blog">
                    Blog
                </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>
<style lang="scss">
@import "assets/styles/helpers/variables";
nav {
  background-color: $obsiblue;
}
</style>

