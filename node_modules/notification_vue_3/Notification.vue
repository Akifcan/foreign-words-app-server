<script>
export default {
    props: {
        notification: {
            required: true,
            type: Object
        }
    }
}
</script>

<template>
    <div v-if='notification' class="notifcation" :class="notification.className" v-html="notification.text">
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
    .notifcation{
        visibility: hidden;
        cursor: default;
        transition: 250ms;
        position: fixed;
        background: #eeeeee;
        border-radius: .5em;
        padding: 1em 2em;
        height: auto;
        width: max-content;
        border-left: 10px solid #dedede;
        color: white;
        font-family: 'Roboto', sans-serif;
    }

    .notifcation.snackbar{
        visibility: visible;
        background: black;
        width: 100%;
        border: none;
        border-radius: 0;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        color: white;
    }

    .notifcation.bottom-right{
        left: initial;
        right: 5%;
        bottom: 5%;
        animation: fromBottom 250ms forwards;
    }

    .notifcation.top-right{
        left: initial;
        top: 5%;
        right: 5%;
        animation: fromTop 250ms forwards;
    }

    .notifcation.top-left{
        top: 5%;
        left: 5%;
        animation: fromTop 250ms forwards;
    }

     .notifcation.bottom-left{
        left: 5%;
        bottom: 5%;
        animation: fromBottom 250ms forwards;
    }
    .notifcation.leave-from-top{
        animation: leaveFromTop 250ms forwards !important;
    } 
    .notifcation.leave-from-bottom{
        animation: leaveFromBottom 250ms forwards !important;
    }

    @keyframes leaveFromTop{
        0%{
            transform: translateY(0%);
        }
        100%{
            transform: translateY(-200%);
        }
    }

      @keyframes leaveFromBottom{
        0%{
            transform: translateY(0%);
        }
        100%{
            transform: translateY(200%);
        }
    }

    @keyframes fromTop{
        0%{
            transform: translateY(-200%);
        }
        100%{
            transform: translateY(0);
        }
    }

    @keyframes fromBottom{
        0%{
            transform: translateY(200%);
        }
        100%{
            transform: translateY(0);
        }
    }


    .notifcation.gray,
    .notifcation.snackbar.gray{
        visibility: visible;
        background: #424242;;
    }

        .notifcation.gray:hover,
    .notifcation.snackbar.gray:hover{
        visibility: visible;
        background: #212121;;
    }

       .notifcation.orange,
    .notifcation.snackbar.orange{
        visibility: visible;
        background: #D84315;
    }

        .notifcation.gray:hover,
    .notifcation.snackbar.gray:hover{
        visibility: visible;
        background: #BF360C;
    }


    .notifcation.primary,
    .notifcation.snackbar.primary{
        visibility: visible;
        background: #1565C0;
    }

    .notifcation.primary:hover,
    .notifcation.snackbar.primary:hover{
        background: #0D47A1;
    }

    .notifcation.warning,
    .notifcation.snackbar.warning
    {
        visibility: visible;
        background: #F9A825;
    }
    .notifcation.warning:hover,
    .notifcation.snackbar.warning:hover{
        background: #F57F17;
    }

    .notifcation.danger,
    .notifcation.snackbar.danger{
        visibility: visible;
        background: #C62828;
    }
    .notifcation.danger:hover,
    .notifcation.snackbar.danger:hover{
        background: #B71C1C;
    }
</style>
