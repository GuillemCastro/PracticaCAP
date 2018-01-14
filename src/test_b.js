function make_thread_system() {
    var threads = [];
    var current_thread = {};
    var return_point;
    return {
        spawn: function(thunk) {
            threads.push(thunk);
        },
        quit: function() {
            if (threads.length >= 1) {
                current_thread = threads.shift();
                current_thread();
            }
            else {
                current_thread = {};
                return_point();
            }
        },
        relinquish: function() {
            current_thread = threads.shift();
            threads.push(new Continuation());
            current_thread();
        },
        start_threads: function() {
            return_point = new Continuation();
            current_thread = threads.shift();
            current_thread();
        }
    };
}

var arr = [];
for (var i = 0; i < 100; ++i) {
    arr[i] = Math.random() * (10 * Math.random());
}
var index = 0;
var sum = 0;

function make_thread_thunk(name, thread_system) {
    function loop() {
        if (index >= arr.length) {
            thread_system.quit();
        }
        print('in thread',name,'; summing =', arr[index])
        sum += arr[index];
        index++;
        thread_system.relinquish();
        loop();
    };
    return loop;
}
var thread_sys = make_thread_system();
thread_sys.spawn(make_thread_thunk('a', thread_sys));
thread_sys.spawn(make_thread_thunk('b', thread_sys));
thread_sys.spawn(make_thread_thunk('c', thread_sys));
thread_sys.spawn(make_thread_thunk('d', thread_sys));
thread_sys.spawn(make_thread_thunk('e', thread_sys));
thread_sys.spawn(make_thread_thunk('f', thread_sys));
thread_sys.start_threads();
print('sum =', sum);

var sum2 = 0;
for (var i = 0; i < arr.length; ++i) {
    sum2 += arr[i];
}
print('sum2 =', sum2);

print('sum = sum2 is', sum === sum2);