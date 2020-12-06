export default {
  data(){
    return{
      initNotification: {}
    }
  },
  methods: {
    showNotification({type, initialPosition, text, fromVuex=false}){
        let leaveClass 
        if(initialPosition == undefined || type == 'snackbar'){
          initialPosition = 'bottom-right'
        }

        if(initialPosition == 'bottom-right' || initialPosition == 'bottom-left'){
          leaveClass = 'leave-from-bottom'
        }
        if(initialPosition == 'top-right' || initialPosition == 'top-left'){
          leaveClass = 'leave-from-top'
        }

        if(fromVuex){
            document.querySelector('.notifcation').classList.add(type)
            document.querySelector('.notifcation').classList.add(initialPosition)
            document.querySelector('.notifcation').innerHTML = text
            
            setTimeout(() => {
              document.querySelector('.notifcation').classList.add(leaveClass)
              setTimeout(() => {
                document.querySelector('.notifcation').classList.remove(type)
                document.querySelector('.notifcation').classList.remove(initialPosition)
                document.querySelector('.notifcation').classList.remove(leaveClass)
              }, 1000)
            }, 2000)

        }else{
            this.initNotification = {
              className: `${type} ${initialPosition}`,
              text
            }

            setTimeout(() => {
              this.initNotification.className+=` ${leaveClass}`
            }, 2000)
            
        }
    }
  }
}