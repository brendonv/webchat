describe('webchat landing controller', function() {

  beforeEach(module('webchat'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('landing controller', function(){
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('MainCtrl', { $scope: $scope });
    });

    it('should ....', function() {
      expect(controller).toBeDefined();
    });

  });
});