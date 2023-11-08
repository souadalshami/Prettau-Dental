<aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
    <div class="app-brand demo">
        <a href="#" class="app-brand-link">
            <span class="app-brand-logo demo">
            </span>
            <img src="./assets/img/logo/black-logo.png" alt="">
        </a>

        <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
            <i class="bx bx-chevron-left bx-sm align-middle"></i>
        </a>
    </div>

    <div class="menu-inner-shadow"></div>

    <ul  class="menu-inner py-1">

        <!-- Certification -->
        <li class="menu-item  ">
            <a href="certifications.php" class="menu-link ">
                <i class="menu-icon tf-icons bx bx-home-circle"></i>
                <div data-i18n="Analytics">Certifications</div>
            </a>
        </li>
        <!-- solution -->
        <li class="menu-item  ">
            <a href="solutions.php" class="menu-link">
                <i class="menu-icon tf-icons bx bx-home-circle"></i>
                <div data-i18n="Analytics">Solutions</div>
            </a>
        </li>
        <!-- category -->
        <li class="menu-item  ">
            <a href="categories.php" class="menu-link">
                <i class="menu-icon tf-icons bx bx-home-circle"></i>
                <div data-i18n="Analytics">Categories</div>
            </a>
        </li>


        <!-- videos -->
        <li class="menu-item">
            <a href="videos.php" class="menu-link">
                <i class="menu-icon tf-icons bx bx-home-circle"></i>
                <div data-i18n="Analytics">Videos</div>
            </a>
        </li>
        <!-- Brands -->
        <li class="menu-item">
            <a href="brands.php" class="menu-link">
                <i class="menu-icon tf-icons bx bx-home-circle"></i>
                <div data-i18n="Analytics">Brands</div>
            </a>
        </li>
        
        
        <!-- Events -->
        <li class="menu-item">
            <a href="events.php" class="menu-link">
                <i class="menu-icon tf-icons bx bx-home-circle"></i>
                <div data-i18n="Analytics">Events</div>
            </a>
        </li>

        <!-- Blogs -->
        <li class="menu-item">
            <a href="blogs.php" class="menu-link">
                <i class="menu-icon tf-icons bx bx-home-circle"></i>
                <div data-i18n="Analytics">Blogs</div>
            </a>
        </li>
    </ul>
</aside>



 <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
<script type="text/javascript">
    
    $(document).on('click', 'li', function(){
        $(this).addClass('active').siblings().removeClass('active')
    })
        
</script>