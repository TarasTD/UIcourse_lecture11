

Observer = function(){
     this.handlers = {};
}

Observer.prototype = {
    subscribe : function(event, handler){
        if (event in this.handlers){
            this.handlers[event].push(handler);
        }
        else {
            this.handlers[event] = [handler];
        }
    },

    fire : function(event){
        this.eventList = event.split(".")
        this.eventConc = ""
        for (i = 0; i < this.eventList.length; i++){
            if (i == 0){
                this.eventConc += this.eventList[i]
            }
            else{
                this.eventConc += "." + this.eventList[i]
            }
            this.handlers[this.eventConc].forEach(
                function(v, i){
                    v();
                }
            )
        }
    }
}


var o = new Observer();

o.subscribe("facebook", function(){
  console.log("1")
});
o.subscribe("facebook.messages", function(){
  console.log("2")
})
o.subscribe("facebook.messages.new", function(){
  console.log("3")
})
o.subscribe("facebook.messages.old", function(){
  console.log("4")
})


o.fire("facebook") // expected: 1
o.fire("facebook.messages") // expected: 2,1
o.fire("facebook.messages.new") // expected: 3,2,1
