function Task(category, title, priority, estimate) {
    var that = this;
    that.category = category;
    that.title = title;
    that.priority = priority;
    that.estimate = estimate;
    that.spent = 0;
    that.remaining = estimate;
}

Task.prototype.done = function() {
    if (this.remaining == 0) {
        return true;
    } else {
        return false;
    }
}
Task.prototype.track = function(spent) {
    if (spent > 0) {
        this.spent = this.spent + spent;
        this.remaining = this.remaining - spent;

    }
}

Task.prototype.complete = function() {
    Task.prototype.track.call(this, this.remaining);
}
