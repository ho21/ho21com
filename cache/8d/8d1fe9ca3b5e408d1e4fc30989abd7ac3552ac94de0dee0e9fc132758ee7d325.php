<?php

/* header.twig */
class __TwigTemplate_86508a9de2930f23e3f2c2f36ea48cc8218e062a7f304c41ba76c95183ac80b1 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        echo "<div class=\"nav\">
<img src=\"/Public/img/logo.png\" alt=\"ho21.com\" title=\"ho21.com\" align=\"bottom\">
";
        // line 3
        if (isset($context["navigaction"])) { $_navigaction_ = $context["navigaction"]; } else { $_navigaction_ = null; }
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable($_navigaction_);
        foreach ($context['_seq'] as $context["_key"] => $context["vo"]) {
            // line 4
            echo "    <a ";
            if (isset($context["vo"])) { $_vo_ = $context["vo"]; } else { $_vo_ = null; }
            if (isset($context["id"])) { $_id_ = $context["id"]; } else { $_id_ = null; }
            if (($this->getAttribute($_vo_, "category_id", array()) == $_id_)) {
                echo " class=\"focus\" ";
            }
            echo " href=\"/index.php/index/list/";
            if (isset($context["vo"])) { $_vo_ = $context["vo"]; } else { $_vo_ = null; }
            echo twig_escape_filter($this->env, $this->getAttribute($_vo_, "category_id", array()), "html", null, true);
            echo "\" title=\"";
            if (isset($context["vo"])) { $_vo_ = $context["vo"]; } else { $_vo_ = null; }
            echo twig_escape_filter($this->env, $this->getAttribute($_vo_, "category_description", array()), "html", null, true);
            echo "\" alt=\"";
            if (isset($context["vo"])) { $_vo_ = $context["vo"]; } else { $_vo_ = null; }
            echo twig_escape_filter($this->env, $this->getAttribute($_vo_, "category_description", array()), "html", null, true);
            echo "\">";
            if (isset($context["vo"])) { $_vo_ = $context["vo"]; } else { $_vo_ = null; }
            echo twig_escape_filter($this->env, $this->getAttribute($_vo_, "category_title", array()), "html", null, true);
            echo "</a>
";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['vo'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 6
        echo "</div>
";
    }

    public function getTemplateName()
    {
        return "header.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  53 => 6,  28 => 4,  23 => 3,  19 => 1,);
    }
}
/* <div class="nav">*/
/* <img src="/Public/img/logo.png" alt="ho21.com" title="ho21.com" align="bottom">*/
/* {% for vo in navigaction %}*/
/*     <a {% if vo.category_id == id %} class="focus" {% endif %} href="/index.php/index/list/{{  vo.category_id }}" title="{{ vo.category_description }}" alt="{{ vo.category_description }}">{{ vo.category_title }}</a>*/
/* {% endfor %}*/
/* </div>*/
/* */
