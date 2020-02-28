'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/','MainController.index').as('main')

/* 404 Not Found sayfası */
//Route.any('*', 'MainController.index')

/*
|
| Nutricions sayfası URL grubu.
| View => pages/nutricions/*.egde
| Controller => NutricionController
|
*/

Route.group(() => {

Route
    .get('/', 'Cms/Nutricions/MenuController.index')
    .as('nutricions.index')


Route
    .post('/crearmenu', 'Cms/Nutricions/MenuController.createMenu')
    .as('nutricions.createMenu')  

Route
   .get('/crearmenu/:id?/:method?' , 'Cms/Nutricions/MenuController.index')
   .as('nutricions.crearMenu')


/*+++++++++++++++++++++++++++++++RECETA+++++++++++++++++++++++++++++++++++*/
Route
.get('/recetas/:id?/:method?', 'Cms/Nutricions/RecetaController.index')
.as('nutricions.recetas')

Route
.get('/recetas/crearmenu-detalles', 'Cms/Nutricions/RecetaController.menudetalles')
.as('recetas.menudetalles')

Route
   .post('/recetas', 'Cms/Nutricions/RecetaController.createRecetas')
   .middleware(['auth:session'])
   .as('recetas.createRecetas')

   Route
   .get('/recetas/add-menu/:id?/:method?', 'Cms/Nutricions/RecetaController.recetasCategoria')
   .as('nutricions.recetasCategoria')



    /*Route
        .get('/receta/:slug', 'NutricionController.recetaDetail')
        .as('nutricions.receta.detail')

    Route
        .get('/crearmenu', 'NutricionController.crearMenu')
        .middleware(['auth:session'])
        .as('nutricions.crearmenu')

    Route
        .post('/crearmenu', 'NutricionController.clearMenu')
        .middleware(['auth:session'])
        .as('nutricions.crearmenu')

    Route
        .get('/crearmenu-detail/:menu_id/:day?', 'NutricionController.clearMenuDetail')
        .middleware(['auth:session'])
        .as('nutricions.crearmenu.detail')

    Route
        .post('/crearmenu-detail/:menu_id/:day?', 'NutricionController.clearMenuDetail')
        .middleware(['auth:session'])
        .as('nutricions.crearmenu.detail')

    Route
        .get('/crearmenu-calendar/:menu_id/:day?', 'NutricionController.clearMenuCalendar')
        .middleware(['auth:session'])
        .as('nutricions.crearmenu.calendar')

    Route
        .post('/crearmenu-calendar/:menu_id/:day?', 'NutricionController.clearMenuCalendar')
        .middleware(['auth:session'])
        .as('nutricions.crearmenu.calendar')*/

}).prefix('nutricions')

/*
|
| Retos sayfası URL grubu.
| View => pages/retos/*.egde
| Controller => RetoController
|
*/

Route.group(() => {

    Route
        .get('/', 'RetoController.index')
        .as('retos.index')

    Route
        .get('/list', 'RetoController.index')
        .as('retos.list')

}).prefix('retos')

/*
|
| Consultas sayfası URL grubu.
| View => pages/consultas/*.egde
| Controller => ConsultaController
|
*/

Route.group(() => {

    Route
        .get('/', 'ConsultaController.index')
        .as('consultas.index')

    Route
        .get('/area-privada', 'ConsultaController.area_privada')
        .as('consultas.area-privada')

    Route
        .get('/personalizada', 'ConsultaController.personalizada')
        .as('consultas.personalizada')

}).prefix('consultas')

/*
|
| Rutinas sayfası URL grubu.
| View => pages/rutinas/*.egde
| Controller => RutinaController
|
*/

Route.group(() => {

    Route
        .get('/', 'RutinaController.detail')
        .as('rutinas.detail')

    Route
        .get('/full-width', 'RutinaController.full_width')
        .as('rutinas.full_width')

    Route
        .get('/full', 'RutinaController.full')
        .as('full')

    Route
        .get('/rutina', 'RutinaController.rutina')
        .as('rutinas.rutina')

}).prefix('rutinas')

/*
|
| Plannes sayfası URL grubu.
| View => pages/plannes/*.egde
| Controller => PlanController
|
*/

Route.group(() => {

    Route
        .get('/', 'PlanController.index')
        .as('plannes.index')

    Route
        .get('/list', 'PlanController.list')
        .as('plannes.list')

    Route
        .get('/calendar', 'PlanController.calendar')
        .as('plannes.calendar')

    Route
        .get('/planes', 'PlanController.planes')
        .as('plannes.planes')
    
    Route
        .get('/respaldoindex', 'PlanController.respaldo')
        .as('plannes.respaldo')

}).prefix('plannes')


/*
|
|Perfil routes
|
*/

Route.group(()=> {

    Route
        .get('/perfil', 'PerfilController.index')
        .as('perfil')

    Route.put('/update', 'UpdateController.index').as('update')

    Route.put('/update-pass', 'UpdateController.changePassword').as('update-pass')

    Route.put('/update-weight', 'UpdateController.updateWeight').as('update-weight')
    Route.put('/delete-weight', 'UpdateController.deleteWeight').as('delete-weight')

    Route.put('/add-medida', 'UpdateController.addMedida').as('add-medida')
    Route.put('/delete-medida', 'UpdateController.deleteMedida').as('delete-medida')

    Route.get('/agenda', 'AgendaController.index').as('agenda')

}).prefix('user')

/*
|
| Calendario sayfası URL grubu.
| View => pages/calendarios/*.egde
| Controller => CalendarioController
|
*/

Route.group(() => {

    Route
        .get('/', 'CalendarioController.index')
        .as('calendarios.index')

    Route
        .get('/calendario', 'CalendarioController.calendario')
        .as('calendarios.calendario')

}).prefix('calendarios')

/*
|
| Aprendizaje sayfası URL grubu.
| View => pages/a12prendizaje/*.egde
| Controller => AprendizajeController
|
*/

Route.group(() => {

    /*Route
    .get('/', 'LearningController.index')
    .as('aprendizajes.index')*/
    
    Route
        .get('/', 'AprendizajeController.index')
        .as('aprendizajes.index')
     Route
        .get('/list', 'AprensizajeController.index')
        .as('aprendizajes.list')

    Route
        .get('/aprendizaje' , 'AprendizajeController.aprendizaje' )
        .as('aprendizajes.aprendizaje')

}).prefix('aprendizajes')

/**-------------------------learning---------- */
Route.group(() => {

Route
  .get('/', 'LearningController.index')
  .as('learning.index')

Route
  .get('/podcasts', 'LearningController.podcasts')
  .as('learning.podcasts')

Route
  .post('/podcasts', 'LearningController.podcasts')
  .as('learning.podcasts')


}).prefix('learning')

/**-------------------------Fecha---------- */
Route.group(() => {

    Route
      .get('/', 'TestController.index')
      .as('test.index')

    Route
      .get('/crearmenu-detalles', 'TestController.menudetalles')
      .as('test.menudetalles')

    
    
    }).prefix('test')
/**----------------------------------- */
/*
|
| Register sayfası URL grubu.
| View => pages/register/*.egde
| Controller => RegisterController
|
*/

Route
    .get('/register', 'RegisterController.index')
    .as('register')

Route
    .post('/register', 'RegisterController.index')
    .validator('Register')
    .as('register')

Route.get('/out', 'RegisterController.out').as('out')


/*
|
| Login sayfası URL grubu.
| View => pages/login/*.egde
| Controller => LoginController
|
*/

Route
    .get('/login', 'LoginController.index')
    .as('login')

Route
    .post('/login', 'LoginController.login')
    .validator('Login')
    .as('login')

/*
| ===============================================================
| CMS Routes Group
| ===============================================================
*/

Route.group(() => {

    /* Login */

    Route
        .get('/login', 'Cms/LoginController.index')
        .as('cms.login')

    Route
        .post('/login', 'Cms/LoginController.login')
        .as('cms.login')
        .validator('Cms/Login')

    /* Dashboard */

    Route
        .get('/dashboard/:id?/:method?', 'Cms/DashboardController.index')
        .middleware(['auth:cms'])
        .as('cms.dashboard')

    Route
        .post('/dashboard', 'Cms/DashboardController.index')
        .middleware(['auth:cms'])
        .validator('Cms/Dashboard')
        .as('cms.dashboard')

    /* Users */

    Route
        .get('/users/:id?/:method?', 'Cms/UserController.index')
        .middleware(['auth:cms'])
        .as('cms.users')

    Route
        .post('/users/:id?/:method?', 'Cms/UserController.index')
        .middleware(['auth:cms'])
        .validator('Cms/User')
        .as('cms.users')

    /* Nutricions Group */

    /*+++++++++++++++++++++++++++++++++NUTRICION DANIELA+++++++++++++++++++++++++++++++*/
    Route
       .get('/nutricions/crearmenu/:id?/:method?' , 'Cms/Nutricions/CrearMenuController.index')
       .middleware(['auth:cms'])
       .as('cms.nutricions.crearmenu')

    Route
       .post('/nutricions/crearmenu' , 'Cms/Nutricions/CrearMenuController.create')
       .middleware(['auth:cms'])
       .as('cms.nutricions.crearmenu.create')

     
    /*+++++++++++++++++++++++++++++++++prueba DANIELA+++++++++++++++++++++++++++++++*/  
    Route
    .get('/nutricions/crearmenu/:id?/:method?' , 'Cms/Nutricions/MenuController.index')
    .middleware(['auth:cms'])
    .as('cms.nutricions.index')
    
    Route
       .post('/nutricions/crearmenu' , 'Cms/Nutricions/MenuController.createMenu')
       .middleware(['auth:cms'])
       .as('cms.nutricions.createMenu')
    
    
    /*+++++++++++++++++++++++++++++++++end prueba DANIELA+++++++++++++++++++++++++++++++*/
    Route
       .get('/nutricions/menu-categories/:id?/:method?', 'Cms/Nutricions/MenuCategoryController.index')
       .middleware(['auth:cms'])
       .as('cms.nutricions.menu.categories')
    Route
       .post('/nutricions/menu-categories', 'Cms/Nutricions/MenuCategoryController.create')
       .middleware(['auth:cms'])
       .as('cms.nutricions.menu.categories.create')
    /*+++++++++++++++++++++++++++++++++RECETA+++++++++++++++++++++++++++++++*/
    Route
       .get('/nutricion/recetas/:id?/:method?', 'Cms/Nutricions/RecetaController.index')
       .middleware(['auth:cms'])
       .as('cms.nutricions.recetas')

    Route
       .post('/nutricion/recetas', 'Cms/Nutricions/RecetaController.index')
       .middleware(['auth:cms'])
       .validator('Cms/Receta')
       .as('cms.nutricions.recetas')
    /*+++++++++++++++++++++++++++++++++NUTRICION DANIELA+++++++++++++++++++++++++++++++*/
    /*+++++++++++++++++++++++++++++++++PRUEBA CALENDARIO++++++++++++++++++++++++++++++*/
   

    /*Route
        .get('/nutricion/recetas/:id?/:method?', 'Cms/Nutricions/RecetaController.index')
        .middleware(['auth:cms'])
        .as('cms.nutricions.recetas')

    Route
        .post('/nutricion/recetas', 'Cms/Nutricions/RecetaController.index')
        .middleware(['auth:cms'])
        .validator('Cms/Receta')
        .as('cms.nutricions.recetas')

    Route
        .get('/nutricion/receta-categories/:id?/:method?', 'Cms/Nutricions/RecetaCategoryController.index')
        .middleware(['auth:cms'])
        .as('cms.nutricions.recetas.categories')

    Route
        .post('/nutricion/receta-categories', 'Cms/Nutricions/RecetaCategoryController.index')
        .middleware(['auth:cms'])
        .validator('Cms/RecetaCategory')
        .as('cms.nutricions.recetas.categories')

    Route
        .get('/nutricion/receta-subcategories/:category_id/:method/:id?','Cms/Nutricions/RecetaSubCategoryController.index')
        .middleware(['auth:cms'])
        .as('cms.nutricions.recetas.subcategories')

    Route
        .post('/nutricion/receta-subcategories/:category_id/:method','Cms/Nutricions/RecetaSubCategoryController.index')
        .middleware(['auth:cms'])
        .validator('Cms/RecetaSubCategory')
        .as('cms.nutricions.recetas.subcategories')

    Route
        .get('/nutricion/receta-images/:receta_id/:id?/:method?', 'Cms/Nutricions/RecetaImageController.index')
        .middleware(['auth:cms'])
        .as('cms.nutricions.recetas.images')

    Route
        .post('/nutricion/receta-images/:receta_id/:id?/:method?', 'Cms/Nutricions/RecetaImageController.index')
        .middleware(['auth:cms'])
        .validator('Cms/RecetaImage')
        .as('cms.nutricions.recetas.images')*/

    /* !End:Nutricions Group */

    /* Plannes */

    Route
        .get('/plannes/:id?/:method?', 'Cms/PlanneController.index')
        .middleware(['auth:cms'])
        .as('cms.plannes')

    Route
        .post('/plannes', 'Cms/PlanneController.index')
        .middleware(['auth:cms'])
        .validator('Cms/Planne')
        .as('cms.plannes')

    Route
        .get('/planne-contents/:plan_id/:id?/:method?', 'Cms/PlanneController.contents')
        .middleware(['auth:cms'])
        .as('cms.plannes.contents')

    Route
        .post('/planne-contents/:plan_id', 'Cms/PlanneController.contents')
        .middleware(['auth:cms'])
        .validator('Cms/PlanneContent')
        .as('cms.plannes.contents')

    /* !End:Plannes */

    /* Subscriptions */

    Route
        .get('/subscriptions/:id?/:method?', 'Cms/SubscriptionController.index')
        .middleware(['auth:cms'])
        .as('cms.subscriptions')

    Route
        .post('/subscriptions', 'Cms/SubscriptionController.index')
        .middleware(['auth:cms'])
        .validator('Cms/Subscription')
        .as('cms.subscriptions')

    Route
        .get('/subscriptions-plannes/:subscription_id/:id?/:method?', 'Cms/SubscriptionController.plannes')
        .middleware(['auth:cms'])
        .as('cms.subscriptions.plannes')

    Route
        .post('/subscriptions-plannes/:subscription_id', 'Cms/SubscriptionController.plannes')
        .middleware(['auth:cms'])
        .validator('Cms/SubscriptionPlanne')
        .as('cms.subscriptions.plannes')

    /* !End:Subscriptions */

    /* Learning  Blog*/

    Route
        .get('/learning/blog/:id?/:method?', 'Cms/Learning/LearningController.index')
        .middleware(['auth:cms'])
        .as('cms.learning.blog')


    Route
        .post('/learning/blog', 'Cms/Learning/LearningController.transaction')
        .middleware(['auth:cms'])
        //.validator('Cms/Learning')
        .as('cms.learning.blog.transaction')

    
    Route
        .post('/learning/blog', 'Cms/Learning/LearningController.storage')
        .middleware(['auth:cms'])
        //.validator('Cms/Learning')
        .as('cms.learning.blog.storage')

 
        /**Learning-podcasts */
    
    Route
       .get('/learning/podcasts-categories/:id?/:method?', 'Cms/Learning/PodcastsCategoryController.index')
       .middleware(['auth:cms'])
       .as('cms.learning.podcasts.categories')

    Route
       .post('/learning/podcasts-categories', 'Cms/Learning/PodcastsCategoryController.index')
       .middleware(['auth:cms'])
       //.validator('Cms/PodcastsCategory')
       .as('cms.learning.podcasts.categories')

       Route
       .post('/learning/podcasts-categories', 'Cms/Learning/PodcastsCategoryController.create')
       .middleware(['auth:cms'])
      // .validator('Cms/PodcastsCategory')
       .as('cms.learning.podcasts.categories.create ')

   
    /* !End:Learning */


}).prefix('cms')