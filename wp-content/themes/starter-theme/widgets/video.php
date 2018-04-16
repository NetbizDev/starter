<?php
namespace Elementor;
 
// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
 
class OWP_Widget_Video extends Widget_Base {
 
    public function get_name() {
        return 'owp-video';
    }
 
    public function get_title() {
        return 'Video Widget';
    }
 
    public function get_icon() {
        return 'eicon-youtube';
    }
 
    public function get_script_depends() {
        return [ 'owp-video' ];
    }
 
    protected function _register_controls() {
 
        $this->start_controls_section(
            'section_video',
            [
                'label' => 'Video',
            ]
        );
 
        $this->add_control(
            'video_id',
            [
                'label' => 'Video ID',
                'type' => Controls_Manager::TEXT,
            ]
        );
 
        $this->end_controls_section();
 
    }
 
    protected function render() {
        $id = $this->get_settings( 'video_id' ); ?>
 
        <div class="owp-fit-aspect-ratio">
            <div class="owp-youtube-player" data-id="<?php echo esc_attr( $id ); ?>">
                <div class="owp-play"><i class="eicon-play"></i></div>
            </div>
        </div>
 
    <?php
    }
 
    protected function _content_template() {}
 
}
 
Plugin::instance()->widgets_manager->register_widget_type( new OWP_Widget_Video() );