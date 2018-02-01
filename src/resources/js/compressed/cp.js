!function(a){Craft.CP=Garnish.Base.extend({authManager:null,$container:null,$alerts:null,$globalSidebar:null,$globalSidebarTopbar:null,$siteNameLink:null,$siteName:null,$nav:null,$subnav:null,$pageHeader:null,$containerTopbar:null,$overflowNavMenuItem:null,$overflowNavMenuBtn:null,$overflowNavMenu:null,$overflowNavMenuList:null,$overflowSubnavMenuItem:null,$overflowSubnavMenuBtn:null,$overflowSubnavMenu:null,$overflowSubnavMenuList:null,$notificationWrapper:null,$notificationContainer:null,$main:null,$content:null,$collapsibleTables:null,$primaryForm:null,navItems:null,totalNavItems:null,visibleNavItems:null,totalNavWidth:null,showingOverflowNavMenu:!1,showingNavToggle:null,showingSidebarToggle:null,subnavItems:null,totalSubnavItems:null,visibleSubnavItems:null,totalSubnavWidth:null,showingOverflowSubnavMenu:!1,selectedItemLabel:null,fixedNotifications:!1,taskInfo:null,workingTaskInfo:null,areTasksStalled:!1,trackTaskProgressTimeout:null,taskProgressIcon:null,$edition:null,upgradeModal:null,checkingForUpdates:!1,forcingRefreshOnUpdatesCheck:!1,checkForUpdatesCallbacks:null,init:function(){0!=Craft.authTimeout&&(this.authManager=new Craft.AuthManager),this.$container=a("#container"),this.$alerts=a("#alerts"),this.$globalSidebar=a("#global-sidebar"),this.$pageHeader=a("#page-header"),this.$containerTopbar=a("#container .topbar"),this.$globalSidebarTopbar=this.$globalSidebar.children(".topbar"),this.$siteNameLink=this.$globalSidebarTopbar.children("a.site-name"),this.$siteName=this.$siteNameLink.children("h2"),this.$nav=a("#nav"),this.$subnav=a("#subnav"),this.$sidebar=a("#sidebar"),this.$notificationWrapper=a("#notifications-wrapper"),this.$notificationContainer=a("#notifications"),this.$main=a("#main"),this.$content=a("#content"),this.$collapsibleTables=a("table.collapsible"),this.$edition=a("#edition"),this.addListener(Garnish.$win,"touchend","updateResponsiveGlobalSidebar"),this.navItems=[],this.totalNavWidth=Craft.CP.baseNavWidth;var b=this.$nav.children();this.totalNavItems=b.length,this.visibleNavItems=this.totalNavItems;for(var c=0;c<this.totalNavItems;c++){var d=a(b[c]),e=d.width();this.navItems.push(d),this.totalNavWidth+=e}this.subnavItems=[],this.totalSubnavWidth=Craft.CP.baseSubnavWidth;var f=this.$subnav.children();this.totalSubnavItems=f.length,this.visibleSubnavItems=this.totalSubnavItems;for(var c=0;c<this.totalSubnavItems;c++){var d=a(f[c]),e=d.width();this.subnavItems.push(d),this.totalSubnavWidth+=e}this.addListener(this.$sidebar.find("nav ul"),"resize","updateResponsiveSidebar"),this.$sidebarLinks=a("nav a",this.$sidebar),this.addListener(this.$sidebarLinks,"click","selectSidebarItem"),this.addListener(this.$container,"scroll","updateFixedNotifications"),this.updateFixedNotifications(),Garnish.$doc.ready(a.proxy(function(){this.addListener(Garnish.$win,"resize","onWindowResize"),this.onWindowResize();var a=this.$notificationContainer.children(".error"),b=this.$notificationContainer.children(":not(.error)");a.delay(2*Craft.CP.notificationDuration).velocity("fadeOut"),b.delay(Craft.CP.notificationDuration).velocity("fadeOut")},this)),this.$alerts.length&&this.initAlerts(),"FORM"==this.$container.prop("nodeName")?this.$primaryForm=this.$container:this.$primaryForm=a("form[data-saveshortcut]:first"),this.$primaryForm.length&&Garnish.hasAttr(this.$primaryForm,"data-saveshortcut")&&this.addListener(Garnish.$doc,"keydown",function(a){return Garnish.isCtrlKeyPressed(a)&&a.keyCode==Garnish.S_KEY&&(a.preventDefault(),this.submitPrimaryForm()),!0}),Garnish.$doc.ready(a.proxy(function(){if(this.$confirmUnloadForms=a("form[data-confirm-unload]"),this.$confirmUnloadForms.length){Craft.forceConfirmUnload||(this.initialFormValues=[]);for(var b=0;b<this.$confirmUnloadForms.length;b++){var c=a(this.$confirmUnloadForms);Craft.forceConfirmUnload||(this.initialFormValues[b]=c.serialize()),this.addListener(c,"submit",function(){this.removeListener(Garnish.$win,"beforeunload")})}this.addListener(Garnish.$win,"beforeunload",function(b){for(var c=0;c<this.$confirmUnloadForms.length;c++)if(Craft.forceConfirmUnload||this.initialFormValues[c]!=a(this.$confirmUnloadForms[c]).serialize()){var d=Craft.t("Any changes will be lost if you leave this page.");return b?b.originalEvent.returnValue=d:window.event.returnValue=d,d}})}},this)),this.$edition.hasClass("hot")&&this.addListener(this.$edition,"click","showUpgradeModal"),a("a").each(function(){this.hostname.length&&this.hostname!==location.hostname&&"undefined"==typeof a(this).attr("target")&&a(this).attr("target","_blank")})},submitPrimaryForm:function(){this.trigger("beforeSaveShortcut"),this.$primaryForm.data("saveshortcut-redirect")&&a('<input type="hidden" name="redirect" value="'+this.$primaryForm.data("saveshortcut-redirect")+'"/>').appendTo(this.$primaryForm),this.$primaryForm.trigger("submit")},updateSidebarMenuLabel:function(){Garnish.$win.trigger("resize");var b=a("a.sel:first",this.$sidebar);this.selectedItemLabel=b.html()},onWindowResize:function(){this.onWindowResize._cpWidth=Math.min(Garnish.$win.width(),Craft.CP.maxWidth),this.updateResponsiveGlobalSidebar(),this.updateResponsiveNav(),this.updateResponsiveSidebar(),this.updateResponsiveTables()},updateResponsiveGlobalSidebar:function(){var a=window.innerHeight;this.$globalSidebar.height(a)},updateResponsiveNav:function(){this.onWindowResize._cpWidth<=992?this.showingNavToggle||this.showNavToggle():this.showingNavToggle&&this.hideNavToggle()},showNavToggle:function(){this.$navBtn=a('<a class="show-nav" title="'+Craft.t("Show nav")+'"></a>').prependTo(this.$containerTopbar),this.addListener(this.$navBtn,"click","toggleNav"),this.showingNavToggle=!0},hideNavToggle:function(){this.$navBtn.remove(),this.showingNavToggle=!1},toggleNav:function(){Garnish.$bod.hasClass("showing-nav")?Garnish.$bod.toggleClass("showing-nav"):Garnish.$bod.toggleClass("showing-nav")},updateResponsiveSidebar:function(){this.$sidebar.length>0&&(this.onWindowResize._cpWidth<769?this.showingSidebarToggle||this.showSidebarToggle():this.showingSidebarToggle&&this.hideSidebarToggle())},showSidebarToggle:function(){var b=a("a.sel:first",this.$sidebar);this.selectedItemLabel=b.html(),this.$sidebarBtn=a('<a class="show-sidebar" title="'+Craft.t("Show sidebar")+'">'+this.selectedItemLabel+"</a>").prependTo(this.$content),this.addListener(this.$sidebarBtn,"click","toggleSidebar"),this.showingSidebarToggle=!0},selectSidebarItem:function(b){var c=a(b.currentTarget);this.selectedItemLabel=c.html(),this.$sidebarBtn&&(this.$sidebarBtn.html(this.selectedItemLabel),this.toggleSidebar())},hideSidebarToggle:function(){this.$sidebarBtn&&this.$sidebarBtn.remove(),this.showingSidebarToggle=!1},toggleSidebar:function(){var a=this.$content.filter(".has-sidebar");a.toggleClass("showing-sidebar"),this.updateResponsiveContent()},updateResponsiveContent:function(){var b=this.$content.filter(".has-sidebar");if(b.hasClass("showing-sidebar")){var c=a("nav",this.$sidebar).height();if(b.height()<=c){var d=c+48;b.css("height",d+"px")}}else b.css("min-height",0),b.css("height","auto")},updateResponsiveTables:function(){for(this.updateResponsiveTables._i=0;this.updateResponsiveTables._i<this.$collapsibleTables.length;this.updateResponsiveTables._i++)this.updateResponsiveTables._$table=this.$collapsibleTables.eq(this.updateResponsiveTables._i),this.updateResponsiveTables._containerWidth=this.updateResponsiveTables._$table.parent().width(),this.updateResponsiveTables._check=!1,this.updateResponsiveTables._containerWidth>0&&("undefined"==typeof this.updateResponsiveTables._$table.data("lastContainerWidth")?this.updateResponsiveTables._check=!0:(this.updateResponsiveTables._isCollapsed=this.updateResponsiveTables._$table.hasClass("collapsed"),this.updateResponsiveTables._containerWidth>this.updateResponsiveTables._$table.data("lastContainerWidth")?this.updateResponsiveTables._isCollapsed&&(this.updateResponsiveTables._$table.removeClass("collapsed"),this.updateResponsiveTables._check=!0):this.updateResponsiveTables._isCollapsed||(this.updateResponsiveTables._check=!0)),this.updateResponsiveTables._check&&this.updateResponsiveTables._$table.width()>this.updateResponsiveTables._containerWidth&&this.updateResponsiveTables._$table.addClass("collapsed"),this.updateResponsiveTables._$table.data("lastContainerWidth",this.updateResponsiveTables._containerWidth))},addLastVisibleNavItemToOverflowMenu:function(){this.navItems[this.visibleNavItems-1].prependTo(this.$overflowNavMenuList),this.visibleNavItems--},addFirstOverflowNavItemToMainMenu:function(){this.navItems[this.visibleNavItems].insertBefore(this.$overflowNavMenuItem),this.visibleNavItems++},addLastVisibleSubnavItemToOverflowMenu:function(){this.subnavItems[this.visibleSubnavItems-1].prependTo(this.$overflowSubnavMenuList),this.visibleSubnavItems--},addFirstOverflowSubnavItemToMainMenu:function(){this.subnavItems[this.visibleSubnavItems].insertBefore(this.$overflowSubnavMenuItem),this.visibleSubnavItems++},updateFixedNotifications:function(){this.updateFixedNotifications._headerHeight=this.$globalSidebar.height(),this.$container.scrollTop()>this.updateFixedNotifications._headerHeight?this.fixedNotifications||(this.$notificationWrapper.addClass("fixed"),this.fixedNotifications=!0):this.fixedNotifications&&(this.$notificationWrapper.removeClass("fixed"),this.fixedNotifications=!1)},displayNotification:function(b,c){var d=Craft.CP.notificationDuration;"error"==b&&(d*=2);var e=a('<div class="notification '+b+'">'+c+"</div>").appendTo(this.$notificationContainer),f=-(e.outerWidth()/2)+"px";e.hide().css({opacity:0,"margin-left":f,"margin-right":f}).velocity({opacity:1,"margin-left":"2px","margin-right":"2px"},{display:"inline-block",duration:"fast"}).delay(d).velocity({opacity:0,"margin-left":f,"margin-right":f},{complete:function(){e.remove()}}),this.trigger("displayNotification",{notificationType:b,message:c})},displayNotice:function(a){this.displayNotification("notice",a)},displayError:function(a){a||(a=Craft.t("An unknown error occurred.")),this.displayNotification("error",a)},fetchAlerts:function(){var b={path:Craft.path};Craft.queueActionRequest("app/getCpAlerts",b,a.proxy(this,"displayAlerts"))},displayAlerts:function(b){if(Garnish.isArray(b)&&b.length){this.$alerts=a('<ul id="alerts"/>').insertBefore(this.$containerTopbar);for(var c=0;c<b.length;c++)a("<li>"+b[c]+"</li>").appendTo(this.$alerts);var d=this.$alerts.outerHeight();this.$alerts.css("margin-top",-d).velocity({"margin-top":0},"fast"),this.initAlerts()}},initAlerts:function(){var b=this.$alerts.find(".domain-mismatch:first");b.length&&this.addListener(b,"click",a.proxy(function(c){c.preventDefault(),confirm(Craft.t("Are you sure you want to transfer your license to this domain?"))&&Craft.queueActionRequest("app/transferLicenseToCurrentDomain",a.proxy(function(a,c){"success"==c&&(a.success?(b.parent().remove(),this.displayNotice(Craft.t("License transferred."))):this.displayError(a.error))},this))},this));for(var c=this.$alerts.find('a[class^="shun:"]'),d=0;d<c.length;d++)this.addListener(c[d],"click",a.proxy(function(b){b.preventDefault();var c=a(b.currentTarget),d={message:c.prop("className").substr(5)};Craft.queueActionRequest("app/shunCpAlert",d,a.proxy(function(a,b){"success"==b&&(a.success?c.parent().remove():this.displayError(a.error))},this))},this));var e=this.$alerts.find(".edition-resolution:first");e.length&&this.addListener(e,"click","showUpgradeModal")},checkForUpdates:function(b,c){if(this.checkingForUpdates&&b===!0&&!this.forcingRefreshOnUpdatesCheck){var d=c;c=function(){Craft.cp.checkForUpdates(!0,d)}}if("function"==typeof c&&(Garnish.isArray(this.checkForUpdatesCallbacks)||(this.checkForUpdatesCallbacks=[]),this.checkForUpdatesCallbacks.push(c)),!this.checkingForUpdates){this.checkingForUpdates=!0,this.forcingRefreshOnUpdatesCheck=b===!0;var e={forceRefresh:b===!0};Craft.queueActionRequest("app/checkForUpdates",e,a.proxy(function(a){if(this.displayUpdateInfo(a),this.checkingForUpdates=!1,Garnish.isArray(this.checkForUpdatesCallbacks)){var b=this.checkForUpdatesCallbacks;this.checkForUpdatesCallbacks=null;for(var c=0;c<b.length;c++)b[c](a)}this.trigger("checkForUpdates",{updateInfo:a})},this))}},displayUpdateInfo:function(b){if(this.$globalSidebarTopbar.children("a.updates").remove(),b.total){var c;c=1==b.total?Craft.t("1 update available"):Craft.t("{num} updates available",{num:b.total}),a('<a class="updates'+(b.critical?" critical":"")+'" href="'+Craft.getUrl("updates")+'" title="'+c+'"><span data-icon="newstamp"><span>'+b.total+"</span></span></span>").insertAfter(this.$siteNameLink),a("#footer-updates").text(c)}},runPendingTasks:function(){Craft.runTasksAutomatically?Craft.queueActionRequest("tasks/runPendingTasks",a.proxy(function(a,b){"success"==b&&this.trackTaskProgress(!1)},this)):this.trackTaskProgress(!1)},trackTaskProgress:function(b){this.trackTaskProgressTimeout||(b===!0&&(this.workingTaskInfo?(b=1e3*this.workingTaskInfo.age,b=Math.min(6e4,Math.max(500,b))):b=6e4),b?this.trackTaskProgressTimeout=setTimeout(a.proxy(this,"_trackTaskProgressInternal"),b):this._trackTaskProgressInternal())},_trackTaskProgressInternal:function(){Craft.queueActionRequest("tasks/getTaskInfo",a.proxy(function(a,b){"success"==b&&(this.trackTaskProgressTimeout=null,this.setTaskInfo(a,!0),this.workingTaskInfo&&this.trackTaskProgress(!0))},this))},setTaskInfo:function(a,b){this.taskInfo=a,this.workingTaskInfo=this.getWorkingTaskInfo(),this.areTasksStalled=this.workingTaskInfo&&"running"===this.workingTaskInfo.status&&this.workingTaskInfo.age>=Craft.CP.minStalledTaskAge,this.updateTaskIcon(this.getRunningTaskInfo(),b),this.trigger("setTaskInfo")},getRunningTaskInfo:function(){for(var a=["running","error","pending"],b=0;b<a.length;b++)for(var c=0;c<this.taskInfo.length;c++)if(0==this.taskInfo[c].level&&this.taskInfo[c].status===a[b])return this.taskInfo[c]},getWorkingTaskInfo:function(){for(var a=this.taskInfo.length-1;a>=0;a--)if("running"===this.taskInfo[a].status)return this.taskInfo[a]},updateTaskIcon:function(a,c){a?(this.taskProgressIcon||(this.taskProgressIcon=new b),this.areTasksStalled?this.taskProgressIcon.showFailMode(Craft.t("Stalled task")):"running"==a.status||"pending"==a.status?(this.taskProgressIcon.hideFailMode(),this.taskProgressIcon.setDescription(a.description),this.taskProgressIcon.setProgress(a.progress,c)):"error"==a.status&&this.taskProgressIcon.showFailMode(Craft.t("Failed task"))):this.taskProgressIcon&&(this.taskProgressIcon.hideFailMode(),this.taskProgressIcon.complete(),delete this.taskProgressIcon)},showUpgradeModal:function(){this.upgradeModal?this.upgradeModal.show():this.upgradeModal=new Craft.UpgradeModal}},{maxWidth:1051,navHeight:38,baseNavWidth:30,subnavHeight:38,baseSubnavWidth:30,notificationDuration:2e3,minStalledTaskAge:300,normalizeTaskStatus:function(a){return"running"===a&&Craft.cp.areTasksStalled?"stalled":a}}),Craft.cp=new Craft.CP;var b=Garnish.Base.extend({$li:null,$a:null,$label:null,hud:null,failMode:!1,_canvasSupported:null,_$bgCanvas:null,_$staticCanvas:null,_$hoverCanvas:null,_$failCanvas:null,_staticCtx:null,_hoverCtx:null,_canvasSize:null,_arcPos:null,_arcRadius:null,_lineWidth:null,_arcStartPos:0,_arcEndPos:0,_arcStartStepSize:null,_arcEndStepSize:null,_arcStep:null,_arcStepTimeout:null,_arcAnimateCallback:null,_progressBar:null,init:function(){if(this.$li=a("<li/>").appendTo(Craft.cp.$nav),this.$a=a('<a id="taskicon"/>').appendTo(this.$li),this.$canvasContainer=a('<span class="icon"/>').appendTo(this.$a),this.$label=a('<span class="label"></span>').appendTo(this.$a),this._canvasSupported=!!document.createElement("canvas").getContext,this._canvasSupported){var b=window.devicePixelRatio>1?2:1;this._canvasSize=18*b,this._arcPos=this._canvasSize/2,this._arcRadius=7*b,this._lineWidth=3*b,this._$bgCanvas=this._createCanvas("bg","#61666b"),this._$staticCanvas=this._createCanvas("static","#d7d9db"),this._$hoverCanvas=this._createCanvas("hover","#fff"),this._$failCanvas=this._createCanvas("fail","#da5a47").hide(),this._staticCtx=this._$staticCanvas[0].getContext("2d"),this._hoverCtx=this._$hoverCanvas[0].getContext("2d"),this._drawArc(this._$bgCanvas[0].getContext("2d"),0,1),this._drawArc(this._$failCanvas[0].getContext("2d"),0,1)}else this._progressBar=new Craft.ProgressBar(this.$canvasContainer),this._progressBar.showProgressBar();this.addListener(this.$a,"click","toggleHud")},setDescription:function(a){this.$a.attr("title",a),this.$label.text(a)},setProgress:function(a,b){this._canvasSupported?b?this._animateArc(0,a):this._setArc(0,a):this._progressBar.setProgressPercentage(100*a)},complete:function(){this._canvasSupported?this._animateArc(0,1,a.proxy(function(){this._$bgCanvas.velocity("fadeOut"),this._animateArc(1,1,a.proxy(function(){this.$a.remove(),this.destroy()},this))},this)):(this._progressBar.setProgressPercentage(100),this.$a.velocity("fadeOut"))},showFailMode:function(a){this.failMode||(this.failMode=!0,this._canvasSupported?(this._$bgCanvas.hide(),this._$staticCanvas.hide(),this._$hoverCanvas.hide(),this._$failCanvas.show()):(this._progressBar.$progressBar.css("border-color","#da5a47"),this._progressBar.$innerProgressBar.css("background-color","#da5a47"),this._progressBar.setProgressPercentage(50)),this.setDescription(a))},hideFailMode:function(){this.failMode&&(this.failMode=!1,this._canvasSupported?(this._$bgCanvas.show(),this._$staticCanvas.show(),this._$hoverCanvas.show(),this._$failCanvas.hide()):(this._progressBar.$progressBar.css("border-color",""),this._progressBar.$innerProgressBar.css("background-color",""),this._progressBar.setProgressPercentage(50)))},toggleHud:function(){this.hud?this.hud.toggle():this.hud=new c},_createCanvas:function(b,c){var d=a('<canvas id="taskicon-'+b+'" width="'+this._canvasSize+'" height="'+this._canvasSize+'"/>').appendTo(this.$canvasContainer),e=d[0].getContext("2d");return e.strokeStyle=c,e.lineWidth=this._lineWidth,e.lineCap="round",d},_setArc:function(a,b){this._arcStartPos=a,this._arcEndPos=b,this._drawArc(this._staticCtx,a,b),this._drawArc(this._hoverCtx,a,b)},_drawArc:function(a,b,c){a.clearRect(0,0,this._canvasSize,this._canvasSize),a.beginPath(),a.arc(this._arcPos,this._arcPos,this._arcRadius,(1.5+2*b)*Math.PI,(1.5+2*c)*Math.PI),a.stroke(),a.closePath()},_animateArc:function(a,b,c){this._arcStepTimeout&&clearTimeout(this._arcStepTimeout),this._arcStep=0,this._arcStartStepSize=(a-this._arcStartPos)/10,this._arcEndStepSize=(b-this._arcEndPos)/10,this._arcAnimateCallback=c,this._takeNextArcStep()},_takeNextArcStep:function(){this._setArc(this._arcStartPos+this._arcStartStepSize,this._arcEndPos+this._arcEndStepSize),this._arcStep++,this._arcStep<10?this._arcStepTimeout=setTimeout(a.proxy(this,"_takeNextArcStep"),50):this._arcAnimateCallback&&this._arcAnimateCallback()}}),c=Garnish.HUD.extend({tasksById:null,completedTasks:null,updateViewProxy:null,init:function(){this.tasksById={},this.completedTasks=[],this.updateViewProxy=a.proxy(this,"updateView"),this.base(Craft.cp.taskProgressIcon.$a),this.$main.attr("id","tasks-hud")},onShow:function(){Craft.cp.on("setTaskInfo",this.updateViewProxy),this.updateView(),this.base()},onHide:function(){if(Craft.cp.off("setTaskInfo",this.updateViewProxy),this.completedTasks.length){for(var a=0;a<this.completedTasks.length;a++)this.completedTasks[a].destroy();this.completedTasks=[]}this.base()},updateView:function(){var a=[];if(Craft.cp.taskInfo)for(var b=0;b<Craft.cp.taskInfo.length;b++)a.push(Craft.cp.taskInfo[b].id);for(var d in this.tasksById)Craft.inArray(d,a)||(this.tasksById[d].complete(),this.completedTasks.push(this.tasksById[d]),delete this.tasksById[d]);if(Craft.cp.taskInfo&&Craft.cp.taskInfo.length)for(var b=0;b<Craft.cp.taskInfo.length;b++){var e=Craft.cp.taskInfo[b];if(this.tasksById[e.id])this.tasksById[e.id].updateStatus(e);else{this.tasksById[e.id]=new c.Task(this,e);for(var f=!1,g=b+1;g<Craft.cp.taskInfo.length;g++)if(this.tasksById[Craft.cp.taskInfo[g].id]){this.tasksById[e.id].$container.insertBefore(this.tasksById[Craft.cp.taskInfo[g].id].$container),f=!0;break}if(!f){var h=this.$main.children("object");h.length?this.tasksById[e.id].$container.insertBefore(h):this.tasksById[e.id].$container.appendTo(this.$main)}}}else this.hide()}});c.Task=Garnish.Base.extend({hud:null,id:null,level:null,description:null,status:null,progress:null,$container:null,$statusContainer:null,$descriptionContainer:null,_progressBar:null,init:function(b,c){this.hud=b,this.id=c.id,this.level=c.level,this.description=c.description,this.$container=a('<div class="task"/>'),this.$statusContainer=a('<div class="task-status"/>').appendTo(this.$container),this.$descriptionContainer=a('<div class="task-description"/>').appendTo(this.$container).text(c.description),this.$container.data("task",this),0!=this.level&&(this.$container.css("padding-"+Craft.left,24+24*this.level),a('<div class="indent" data-icon="'+("ltr"==Craft.orientation?"rarr":"larr")+'"/>').appendTo(this.$descriptionContainer)),this.updateStatus(c)},updateStatus:function(b){if(this.status!==(this.status=Craft.CP.normalizeTaskStatus(b.status)))switch(this.$statusContainer.empty(),this.status){case"pending":this.$statusContainer.text(Craft.t("Pending"));break;case"running":this._progressBar=new Craft.ProgressBar(this.$statusContainer),this._progressBar.showProgressBar();break;case"stalled":case"error":if(a('<span class="error">'+("stalled"===this.status?Craft.t("Stalled"):Craft.t("Failed"))+"</span>").appendTo(this.$statusContainer),0==this.level){var c=a('<a class="menubtn error" title="'+Craft.t("Options")+'"/>').appendTo(this.$statusContainer);a('<div class="menu"><ul><li><a data-action="rerun">'+Craft.t("Try again")+'</a></li><li><a data-action="cancel">'+Craft.t("Cancel")+"</a></li></ul></div>").appendTo(this.$statusContainer),new Garnish.MenuBtn(c,{onOptionSelect:a.proxy(this,"performErrorAction")})}}"running"==this.status&&this._progressBar.setProgressPercentage(100*b.progress)},performErrorAction:function(b){for(var c=this.$container.nextAll(),d=0;d<c.length;d++){var e=a(c[d]).data("task");if(!e||0==e.level)break;e.destroy()}switch(a(b).data("action")){case"rerun":Craft.postActionRequest("tasks/rerunTask",{taskId:this.id},a.proxy(function(a,b){"success"==b&&(this.updateStatus(a),Craft.cp.trackTaskProgress(!1))},this));break;case"cancel":Craft.postActionRequest("tasks/deleteTask",{taskId:this.id},a.proxy(function(a,b){"success"==b&&(this.destroy(),Craft.cp.trackTaskProgress(!1))},this))}},complete:function(){this.$statusContainer.empty(),a('<div data-icon="check"/>').appendTo(this.$statusContainer)},destroy:function(){this.hud.tasksById[this.id]&&delete this.hud.tasksById[this.id],this.$container.remove(),this.base()}})}(jQuery);
//# sourceMappingURL=cp.js.map